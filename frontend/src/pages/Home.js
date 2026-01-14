import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles, Shield, Zap, Star } from 'lucide-react';
import { COMPANY_DETAILS } from '../config';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <section 
        className="relative py-32 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FDFBF7 0%, #F3E8FF 50%, #E0F2FE 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1765383694090-1897d1c6f39e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHw0fHxteXN0aWNhbCUyMGNsb3VkcyUyMGxpZ2h0JTIwc2t5JTIwZXRoZXJlYWx8ZW58MHx8fHwxNzY4Mzk2OTA2fDA&ixlib=rb-4.1.0&q=85" 
            alt="Ethereal sky" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8">
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary tracking-tight"
              data-testid="hero-heading"
            >
              Discover Your Cosmic Path
            </h1>
            <p className="text-lg sm:text-xl text-secondary/70 max-w-2xl mx-auto leading-relaxed">
              {COMPANY_DETAILS.company_bio}
            </p>
            <div className="flex gap-4 justify-center pt-8">
              <Button
                onClick={() => navigate('/birth-details')}
                className="bg-primary text-white rounded-full px-8 py-6 text-lg font-medium hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                data-testid="get-report-button"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Your Report
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="bg-white text-secondary border border-secondary/20 rounded-full px-8 py-6 text-lg font-medium hover:bg-secondary/5 transition-all"
                data-testid="login-button-hero"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-secondary mb-16">
            Why Choose {COMPANY_DETAILS.company_name}?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              data-testid="feature-card-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Authentic Vedic Astrology</h3>
              <p className="text-secondary/70">
                Based on ancient Vedic wisdom and precise astronomical calculations for accurate insights.
              </p>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              data-testid="feature-card-2"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Instant Reports</h3>
              <p className="text-secondary/70">
                Get your personalized astrology report immediately after secure payment verification.
              </p>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              data-testid="feature-card-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Comprehensive Insights</h3>
              <p className="text-secondary/70">
                Detailed analysis of your birth chart, planetary positions, and life predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F7F4F0 100%)' }}>
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl font-bold text-secondary">
            Ready to Explore Your Destiny?
          </h2>
          <p className="text-lg text-secondary/70">
            Start your journey with a personalized astrology report today.
          </p>
          <Button
            onClick={() => navigate('/birth-details')}
            className="bg-primary text-white rounded-full px-10 py-6 text-lg font-medium hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            data-testid="cta-button"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
