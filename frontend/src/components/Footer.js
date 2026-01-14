import React from 'react';
import { COMPANY_DETAILS } from '../config';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img 
              src={COMPANY_DETAILS.logo_url} 
              alt={COMPANY_DETAILS.company_name} 
              className="h-10 w-auto mb-4"
            />
            <p className="text-white/80 text-sm">
              {COMPANY_DETAILS.company_bio}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${COMPANY_DETAILS.company_email}`} className="hover:text-white">
                  {COMPANY_DETAILS.company_email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${COMPANY_DETAILS.company_mobile}`} className="hover:text-white">
                  {COMPANY_DETAILS.company_mobile}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm text-white/80">
              <a href="/" className="block hover:text-white">Home</a>
              <a href="/about" className="block hover:text-white">About</a>
              <a href="/contact" className="block hover:text-white">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          {COMPANY_DETAILS.footer_text}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
