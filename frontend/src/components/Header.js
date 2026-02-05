import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COMPANY_DETAILS } from '../config';
import { isAuthenticated, logout, getUser } from '../utils/auth';
import { Button } from './ui/button';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" data-testid="header-logo">
            <img 
            //  src={COMPANY_DETAILS.logo_url} 
              alt={COMPANY_DETAILS.company_name} 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-secondary tracking-tight">
              {COMPANY_DETAILS.company_name}
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            {isAuth ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className="rounded-full"
                  data-testid="dashboard-nav-button"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                {user?.is_admin && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/admin')}
                    className="rounded-full"
                    data-testid="admin-nav-button"
                  >
                    Admin
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="rounded-full"
                  data-testid="logout-button"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="rounded-full"
                  data-testid="login-nav-button"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-primary text-white rounded-full px-6 hover:bg-primary/90"
                  data-testid="register-nav-button"
                >
                  Get Started
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
