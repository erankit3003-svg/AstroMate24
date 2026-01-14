#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class AstroMate24APITester:
    def __init__(self, base_url="https://astrosite-pro.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        
        if headers:
            default_headers.update(headers)
        
        if self.token and 'Authorization' not in default_headers:
            default_headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=default_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=30)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if not success:
                details += f" (Expected: {expected_status})"
                try:
                    error_data = response.json()
                    details += f" - {error_data.get('detail', 'Unknown error')}"
                except:
                    details += f" - {response.text[:100]}"

            self.log_test(name, success, details)
            
            if success:
                try:
                    return response.json()
                except:
                    return {"status": "success"}
            return None

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return None

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_company_details(self):
        """Test company details endpoint"""
        return self.run_test("Company Details", "GET", "company", 200)

    def test_user_registration(self):
        """Test user registration"""
        timestamp = int(time.time())
        user_data = {
            "name": f"Test User {timestamp}",
            "email": f"test{timestamp}@example.com",
            "mobile": f"+91987654{timestamp % 10000:04d}",
            "password": "TestPass123!"
        }
        
        response = self.run_test("User Registration", "POST", "auth/register", 200, user_data)
        if response and 'token' in response:
            self.token = response['token']
            return response
        return None

    def test_user_login(self):
        """Test user login with admin credentials"""
        login_data = {
            "email": "admin@astromate24.com",
            "password": "admin123"
        }
        
        response = self.run_test("Admin Login", "POST", "auth/login", 200, login_data)
        if response and 'token' in response:
            self.admin_token = response['token']
            return response
        return None

    def test_get_current_user(self):
        """Test get current user endpoint"""
        if not self.token:
            self.log_test("Get Current User", False, "No token available")
            return None
        
        return self.run_test("Get Current User", "GET", "auth/me", 200)

    def test_create_order(self):
        """Test payment order creation"""
        if not self.token:
            self.log_test("Create Order", False, "No token available")
            return None

        birth_data = {
            "full_name": "Test User",
            "email": "test@example.com",
            "mobile": "+919876543210",
            "place": "New Delhi, India",
            "lat": 28.6139,
            "lon": 77.2090,
            "day": 15,
            "month": 8,
            "year": 1990,
            "hour": 14,
            "min": 30,
            "sec": 0,
            "tzone": 5.5,
            "gender": "male"
        }
        
        order_data = {
            "amount": 499,
            "birth_data": birth_data
        }
        
        response = self.run_test("Create Payment Order", "POST", "payments/create-order", 200, order_data)
        return response

    def test_payment_verification_invalid(self):
        """Test payment verification with invalid data"""
        if not self.token:
            self.log_test("Payment Verification (Invalid)", False, "No token available")
            return None

        payment_data = {
            "razorpay_order_id": "order_invalid",
            "razorpay_payment_id": "pay_invalid",
            "razorpay_signature": "invalid_signature",
            "order_id": "invalid_order_id"
        }
        
        # This should fail with 400 or 404
        response = self.run_test("Payment Verification (Invalid)", "POST", "payments/verify", 400, payment_data)
        return response

    def test_get_my_reports(self):
        """Test get user reports"""
        if not self.token:
            self.log_test("Get My Reports", False, "No token available")
            return None
        
        return self.run_test("Get My Reports", "GET", "reports/my-reports", 200)

    def test_get_report_invalid(self):
        """Test get report with invalid ID"""
        if not self.token:
            self.log_test("Get Report (Invalid)", False, "No token available")
            return None
        
        return self.run_test("Get Report (Invalid)", "GET", "reports/invalid-report-id", 404)

    def test_admin_endpoints(self):
        """Test admin endpoints"""
        if not self.admin_token:
            self.log_test("Admin Users", False, "No admin token available")
            self.log_test("Admin Orders", False, "No admin token available")
            self.log_test("Admin Reports", False, "No admin token available")
            return

        # Temporarily use admin token
        original_token = self.token
        self.token = self.admin_token

        self.run_test("Admin Users", "GET", "admin/users", 200)
        self.run_test("Admin Orders", "GET", "admin/orders", 200)
        self.run_test("Admin Reports", "GET", "admin/reports", 200)

        # Restore original token
        self.token = original_token

    def test_unauthorized_access(self):
        """Test unauthorized access to protected endpoints"""
        # Temporarily remove token
        original_token = self.token
        self.token = None

        self.run_test("Unauthorized - Get Me", "GET", "auth/me", 401)
        self.run_test("Unauthorized - Create Order", "POST", "payments/create-order", 401, {"amount": 499, "birth_data": {}})
        self.run_test("Unauthorized - My Reports", "GET", "reports/my-reports", 401)

        # Restore token
        self.token = original_token

    def test_non_admin_access(self):
        """Test non-admin access to admin endpoints"""
        if not self.token:
            self.log_test("Non-Admin Access", False, "No token available")
            return

        self.run_test("Non-Admin - Users", "GET", "admin/users", 403)
        self.run_test("Non-Admin - Orders", "GET", "admin/orders", 403)
        self.run_test("Non-Admin - Reports", "GET", "admin/reports", 403)

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting AstroMate24 API Tests...")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)

        # Basic API tests
        self.test_root_endpoint()
        self.test_company_details()

        # Authentication tests
        self.test_user_registration()
        self.test_user_login()
        self.test_get_current_user()

        # Payment tests
        self.test_create_order()
        self.test_payment_verification_invalid()

        # Report tests
        self.test_get_my_reports()
        self.test_get_report_invalid()

        # Admin tests
        self.test_admin_endpoints()

        # Security tests
        self.test_unauthorized_access()
        self.test_non_admin_access()

        # Print summary
        print("=" * 60)
        print(f"📊 Tests completed: {self.tests_passed}/{self.tests_run}")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"✨ Success rate: {success_rate:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

    def get_test_summary(self):
        """Get test summary for reporting"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_results": self.test_results
        }

def main():
    tester = AstroMate24APITester()
    exit_code = tester.run_all_tests()
    
    # Save test results
    summary = tester.get_test_summary()
    with open('/tmp/backend_test_results.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    return exit_code

if __name__ == "__main__":
    sys.exit(main())