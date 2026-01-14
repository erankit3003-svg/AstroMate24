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

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      setToken(response.data.token);
      setUser(response.data.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: 'linear-gradient(135deg, #FDFBF7 0%, #F3E8FF 50%, #E0F2FE 100%)' }}>
      <div className="container mx-auto max-w-md">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-2" data-testid="login-heading">Welcome Back</h1>
          <p className="text-secondary/70 mb-8">Login to access your astrology reports</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 bg-white/50 border-secondary/10 focus:border-primary/50"
                required
                data-testid="login-email-input"
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
                data-testid="login-password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-full py-6 hover:bg-primary/90"
              data-testid="login-submit-button"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-secondary/70">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-primary hover:underline"
              data-testid="register-link"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
