import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';
import { setToken, setUser } from '../utils/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/register`, formData);
      setToken(response.data.token);
      setUser(response.data.user);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: 'linear-gradient(135deg, #FDFBF7 0%, #F3E8FF 50%, #E0F2FE 100%)' }}>
      <div className="container mx-auto max-w-md">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-2" data-testid="register-heading">Create Account</h1>
          <p className="text-secondary/70 mb-8">Join us to unlock your cosmic insights</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 bg-white/50 border-secondary/10 focus:border-primary/50"
                required
                data-testid="register-name-input"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 bg-white/50 border-secondary/10 focus:border-primary/50"
                required
                data-testid="register-email-input"
              />
            </div>

            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="mt-2 bg-white/50 border-secondary/10 focus:border-primary/50"
                required
                data-testid="register-mobile-input"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-2 bg-white/50 border-secondary/10 focus:border-primary/50"
                required
                data-testid="register-password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-full py-6 hover:bg-primary/90"
              data-testid="register-submit-button"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-secondary/70">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline"
              data-testid="login-link"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
