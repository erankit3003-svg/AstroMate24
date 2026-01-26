import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Sparkles, Shield, Zap, Star, BookOpen, Compass, 
  CircleDot, TrendingUp, Heart, Gem, Users, Calendar,
  Moon, Sun, Activity, Target, Award, Eye
} from 'lucide-react';
import { COMPANY_DETAILS } from '../config';

const Home = () => {
  const navigate = useNavigate();

  const reportFeatures = [
    {
      icon: BookOpen,
      title: "Personal Introduction & Life Overview",
      description: "Discover your unique cosmic signature and what makes you truly special. Get personalized insights into your core personality, life purpose, and karmic path."
    },
    {
      icon: Star,
      title: "Detailed Astrological Blueprint",
      description: "Understand your birth chart fundamentals including your rising sign, moon sign, and sun sign. Learn how these celestial positions shape your destiny and character."
    },
    {
      icon: CircleDot,
      title: "Planetary Positions & Influences",
      description: "See exactly where each planet was at your birth and how their cosmic energies influence your relationships, career, health, and fortune throughout life."
    },
    {
      icon: Compass,
      title: "Complete Horoscope Charts",
      description: "Visual birth chart diagrams showing your planetary placements. Decode the cosmic map that reveals your strengths, challenges, and hidden talents."
    },
    {
      icon: Target,
      title: "House Cusps Analysis",
      description: "Explore all 12 houses of your life—career, wealth, family, love, health. Understand which life areas will flourish and which need attention."
    },
    {
      icon: Activity,
      title: "Divisional Charts (Vargas)",
      description: "Deep dive into specialized charts for marriage, career, wealth, and spiritual growth. These reveal nuanced aspects of your destiny unavailable in basic readings."
    },
    {
      icon: Users,
      title: "Friendship & Relationship Compatibility",
      description: "Discover how you connect with others based on planetary harmony. Know which relationships bring growth and which require careful navigation."
    },
    {
      icon: Moon,
      title: "KP Astrology Insights",
      description: "Advanced Krishnamurti Paddhati analysis for precise predictions. Get specific timing for major life events with unmatched accuracy."
    },
    {
      icon: Sun,
      title: "Ascendant & Rising Sign Report",
      description: "Your rising sign shapes your outward personality and first impressions. Learn how others perceive you and how to leverage this cosmic advantage."
    },
    {
      icon: TrendingUp,
      title: "Bhava Kundli (House Strength)",
      description: "Measure the power of each life area. Know where fortune smiles and where effort is required to achieve success and happiness."
    },
    {
      icon: Calendar,
      title: "Vimshottari Dasha Timeline",
      description: "Your personalized planetary timeline spanning decades. Know when opportunities arise, challenges appear, and transformations occur in your 15-year cosmic blueprint."
    },
    {
      icon: Eye,
      title: "Yogini Dasha Predictions",
      description: "Ancient timing system revealing 8 phases of life cycles. Understand your current phase and prepare for upcoming transitions with wisdom."
    },
    {
      icon: Award,
      title: "Sadhesati Analysis (Saturn Transit)",
      description: "Know when Saturn's powerful 7.5-year cycle affects you. Prepare for karmic lessons, major life shifts, and ultimate spiritual growth periods."
    },
    {
      icon: Shield,
      title: "Kalsarpa Dosha Detection",
      description: "Identify if this powerful planetary alignment exists in your chart and learn remedies to neutralize obstacles and unlock hidden potential."
    },
    {
      icon: Heart,
      title: "Manglik Analysis (Mars Influence)",
      description: "Crucial for marriage compatibility. Discover Mars placement effects on relationships and proven remedies for harmonious partnerships."
    },
    {
      icon: Sparkles,
      title: "Complete Planet Profiles",
      description: "Detailed report on all 9 planets in your chart—their strengths, weaknesses, blessings, and challenges they bring to your life journey."
    },
    {
      icon: Gem,
      title: "Personalized Gemstone Recommendations",
      description: "Scientifically matched gemstones to enhance favorable planets and reduce malefic influences. Boost luck, health, and prosperity with cosmic remedies."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
            <div className="inline-block px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium mb-4">
              Complete 15-Year Cosmic Forecast
            </div>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary tracking-tight leading-tight"
              data-testid="hero-heading"
            >
              15 Years of Cosmic Blueprint Pdf Report<br/>
              <span className="text-primary">Decode Your Destiny with Vedic Astrology</span>
            </h1>
            <p className="text-lg sm:text-xl text-secondary/70 max-w-3xl mx-auto leading-relaxed">
              Unlock the secrets written in the stars at your birth. Get a comprehensive 100+ page personalized Vedic astrology report covering your personality, relationships, career, health, and 15-year life predictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                onClick={() => navigate('/birth-details')}
                className="bg-primary text-white rounded-full px-10 py-7 text-lg font-medium hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                data-testid="get-report-button"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Your Report - ₹499
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="bg-white text-secondary border border-secondary/20 rounded-full px-10 py-7 text-lg font-medium hover:bg-secondary/5 transition-all"
                data-testid="login-button-hero"
              >
                Already a Member? Login
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 pt-6 text-sm text-secondary/60">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Instant PDF Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Authentic Vedic Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">
              What's Inside Your Cosmic Blueprint?
            </h2>
            <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
              Your personalized 100+ page PDF report includes 17 comprehensive sections covering every aspect of your life and destiny
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-primary/10 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  data-testid={`report-feature-${index}`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-secondary">{feature.title}</h3>
                  <p className="text-sm text-secondary/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #F7F4F0 0%, #FDFBF7 100%)' }}>
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-secondary mb-16">
            Why {COMPANY_DETAILS.company_name}?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              data-testid="feature-card-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Authentic Vedic Science</h3>
              <p className="text-secondary/70 leading-relaxed">
                Based on 5000+ years of Vedic wisdom and precise astronomical calculations. No generic predictions—only personalized insights.
              </p>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              data-testid="feature-card-2"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Instant PDF Delivery</h3>
              <p className="text-secondary/70 leading-relaxed">
                Get your comprehensive 100+ page report immediately after secure payment. Download, save, and revisit anytime.
              </p>
            </div>

            <div 
              className="bg-white/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
              data-testid="feature-card-3"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">15-Year Life Forecast</h3>
              <p className="text-secondary/70 leading-relaxed">
                Complete Dasha timeline covering the next 15 years. Know when opportunities arise and challenges appear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Social Proof Section */}
      <section className="py-20 px-6 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-primary fill-primary" />
                ))}
              </div>
            </div>
            <p className="text-2xl font-serif italic text-secondary mb-6 max-w-3xl mx-auto">
              "This report transformed my understanding of my life patterns. The 15-year forecast helped me make confident decisions about career and relationships. Worth every rupee!"
            </p>
            <p className="text-secondary/70">— Priya S., Mumbai</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #FDFBF7 0%, #F3E8FF 50%, #E0F2FE 100%)' }}>
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary">
            Your Cosmic Blueprint Awaits
          </h2>
          <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
            Join thousands who've unlocked their destiny. Get your personalized 100+ page Vedic astrology report with 15-year predictions for just ₹499.
          </p>
          <Button
            onClick={() => navigate('/birth-details')}
            className="bg-primary text-white rounded-full px-12 py-7 text-xl font-medium hover:bg-primary/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            data-testid="cta-button"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Get Your Report Now - ₹499
          </Button>
          <p className="text-sm text-secondary/60">
            Secure payment via Razorpay • Instant delivery • 100% authentic Vedic analysis
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
