import React from 'react';
import { Button } from './ui/button';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: 'Our Mission', href: '#about' },
      { name: 'Board & Leadership', href: '#about' },
      { name: 'Annual Reports', href: '#' },
      { name: 'Careers', href: '#' }
    ],
    services: [
      { name: 'Planning Applications', href: '#planning' },
      { name: 'Business Support', href: '#' },
      { name: 'Event Permits', href: '#' },
      { name: 'Development Guidance', href: '#' }
    ],
    resources: [
      { name: 'News & Updates', href: '#news' },
      { name: 'Meeting Minutes', href: '#governance' },
      { name: 'Design Guidelines', href: '#planning' },
      { name: 'Contact Directory', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Accessibility Statement', href: '#accessibility' },
      { name: 'Terms of Use', href: '#' },
      { name: 'Cookie Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/oxfordstreetdc', icon: '𝕏' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/oxford-street-dc', icon: 'in' },
    { name: 'Instagram', href: 'https://instagram.com/oxfordstreetdc', icon: '📷' }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand & Contact */}
            <div className="lg:col-span-2">
              <h3 className="heritage-serif text-2xl font-bold mb-4">
                Oxford Street Development Corporation
              </h3>
              <p className="heritage-sans text-sm opacity-90 mb-6">
                Enhancing London's premier shopping destination through thoughtful development and community engagement.
              </p>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="heritage-sans">Oxford Street Development Corporation</p>
                    <p className="heritage-sans opacity-75">123 Oxford Street, London W1D 2HX</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0" />
                  <a 
                    href="tel:+442071234567" 
                    className="heritage-sans hover:text-accent transition-colors focus-visible:focus-visible"
                  >
                    +44 20 7123 4567
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                  <a 
                    href="mailto:info@oxfordstreetdc.org.uk" 
                    className="heritage-sans hover:text-accent transition-colors focus-visible:focus-visible"
                  >
                    info@oxfordstreetdc.org.uk
                  </a>
                </div>
              </div>
            </div>

            {/* About Links */}
            <div>
              <h4 className="heritage-serif text-lg font-semibold mb-4">About</h4>
              <ul className="space-y-2">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="heritage-sans text-sm opacity-75 hover:opacity-100 hover:text-accent transition-colors focus-visible:focus-visible touch-target block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="heritage-serif text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="heritage-sans text-sm opacity-75 hover:opacity-100 hover:text-accent transition-colors focus-visible:focus-visible touch-target block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="heritage-serif text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="heritage-sans text-sm opacity-75 hover:opacity-100 hover:text-accent transition-colors focus-visible:focus-visible touch-target block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="heritage-serif text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="heritage-sans text-sm opacity-75 hover:opacity-100 hover:text-accent transition-colors focus-visible:focus-visible touch-target block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 py-8">
          <div className="text-center">
            <h4 className="heritage-serif text-xl font-semibold mb-4">
              Stay Connected
            </h4>
            <p className="heritage-sans text-sm opacity-90 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates on Oxford Street developments, events, and initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="heritage-sans flex-1 px-4 py-2 rounded-md text-foreground bg-white focus-visible:focus-visible touch-target"
                aria-label="Email address for newsletter"
              />
              <Button 
                variant="secondary"
                className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="heritage-sans text-sm opacity-75">
                © {currentYear} Oxford Street Development Corporation. All rights reserved.
              </p>
              <p className="heritage-sans text-xs opacity-60 mt-1">
                Designed for UK-based hosting and data residency compliance.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="heritage-sans text-sm opacity-75">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors focus-visible:focus-visible touch-target"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Accessibility & Privacy Pages Placeholders */}
        <div id="accessibility" className="hidden">
          <h2>Accessibility Statement</h2>
          <p>Oxford Street Development Corporation is committed to ensuring digital accessibility for people with disabilities...</p>
        </div>

        <div id="privacy" className="hidden">
          <h2>Privacy Policy</h2>
          <p>This privacy policy explains how Oxford Street Development Corporation collects, uses, and protects your personal information...</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

