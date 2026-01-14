import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';
import { getToken, isAuthenticated } from '../utils/auth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Loader2, Calendar, MapPin } from 'lucide-react';

const BirthDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    place: '',
    lat: '',
    lon: '',
    day: '',
    month: '',
    year: '',
    hour: '',
    min: '',
    sec: '0',
    tzone: '5.5',
    gender: 'male'
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error('Please login to continue');
      navigate('/login');
    }
  }, [navigate]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (orderData) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Failed to load payment gateway');
      return;
    }

    const options = {
      key: orderData.key,
      amount: orderData.amount * 100,
      currency: 'INR',
      name: 'AstroMate24',
      description: 'Astrology Report',
      order_id: orderData.razorpay_order_id,
      handler: async function (response) {
        try {
          const verifyResponse = await axios.post(
            `${API}/payments/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: orderData.order_id
            },
            {
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            }
          );

          toast.success('Payment successful! Generating your report...');
          setTimeout(() => {
            navigate(`/report/${verifyResponse.data.report_id}`);
          }, 2000);
        } catch (error) {
          toast.error('Payment verification failed');
        }
      },
      prefill: {
        name: formData.full_name,
        email: formData.email,
        contact: formData.mobile
      },
      theme: {
        color: '#B49248'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const birthData = {
        full_name: formData.full_name,
        email: formData.email,
        mobile: formData.mobile,
        place: formData.place,
        lat: parseFloat(formData.lat),
        lon: parseFloat(formData.lon),
        day: parseInt(formData.day),
        month: parseInt(formData.month),
        year: parseInt(formData.year),
        hour: parseInt(formData.hour),
        min: parseInt(formData.min),
        sec: parseInt(formData.sec),
        tzone: parseFloat(formData.tzone),
        gender: formData.gender
      };

      const response = await axios.post(
        `${API}/payments/create-order`,
        {
          amount: 499,
          birth_data: birthData
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      await handlePayment(response.data);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6" style={{ background: 'linear-gradient(135deg, #FDFBF7 0%, #F3E8FF 50%, #E0F2FE 100%)' }}>
      <div className="container mx-auto max-w-2xl">
        <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-secondary mb-2" data-testid="birth-details-heading">
            Birth Details
          </h1>
          <p className="text-secondary/70 mb-8">
            Enter your accurate birth details for a personalized astrology report
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="mt-2 bg-white/50"
                  required
                  data-testid="full-name-input"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger className="mt-2 bg-white/50" data-testid="gender-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 bg-white/50"
                  required
                  data-testid="birth-email-input"
                />
              </div>

              <div>
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="mt-2 bg-white/50"
                  required
                  data-testid="mobile-input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="place" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Birth Place
              </Label>
              <Input
                id="place"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="mt-2 bg-white/50"
                placeholder="City, Country"
                required
                data-testid="place-input"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                  className="mt-2 bg-white/50"
                  placeholder="28.6139"
                  required
                  data-testid="lat-input"
                />
              </div>

              <div>
                <Label htmlFor="lon">Longitude</Label>
                <Input
                  id="lon"
                  type="number"
                  step="any"
                  value={formData.lon}
                  onChange={(e) => setFormData({ ...formData, lon: e.target.value })}
                  className="mt-2 bg-white/50"
                  placeholder="77.2090"
                  required
                  data-testid="lon-input"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="bg-white/50"
                  required
                  data-testid="day-input"
                />
                <Input
                  type="number"
                  placeholder="Month"
                  min="1"
                  max="12"
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="bg-white/50"
                  required
                  data-testid="month-input"
                />
                <Input
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max="2025"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="bg-white/50"
                  required
                  data-testid="year-input"
                />
              </div>
            </div>

            <div>
              <Label className="mb-3">Time of Birth</Label>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="number"
                  placeholder="Hour"
                  min="0"
                  max="23"
                  value={formData.hour}
                  onChange={(e) => setFormData({ ...formData, hour: e.target.value })}
                  className="bg-white/50"
                  required
                  data-testid="hour-input"
                />
                <Input
                  type="number"
                  placeholder="Min"
                  min="0"
                  max="59"
                  value={formData.min}
                  onChange={(e) => setFormData({ ...formData, min: e.target.value })}
                  className="bg-white/50"
                  required
                  data-testid="min-input"
                />
                <Input
                  type="number"
                  placeholder="Sec"
                  min="0"
                  max="59"
                  value={formData.sec}
                  onChange={(e) => setFormData({ ...formData, sec: e.target.value })}
                  className="bg-white/50"
                  data-testid="sec-input"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tzone">Timezone (UTC offset)</Label>
              <Input
                id="tzone"
                type="number"
                step="0.5"
                value={formData.tzone}
                onChange={(e) => setFormData({ ...formData, tzone: e.target.value })}
                className="mt-2 bg-white/50"
                placeholder="5.5 for IST"
                required
                data-testid="tzone-input"
              />
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-secondary">Astrology Report</p>
                  <p className="text-sm text-secondary/70">Complete birth chart analysis</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">₹499</p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-full py-6 text-lg hover:bg-primary/90 shadow-lg"
              data-testid="proceed-payment-button"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BirthDetails;
