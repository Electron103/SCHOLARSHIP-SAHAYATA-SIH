import React from 'react';
import { DICTIONARY } from '../constants';
import { LanguageCode } from '../types';
import { MapPin, Phone, Mail, Facebook, Youtube, ExternalLink, Instagram, X as XIcon } from 'lucide-react';

interface FooterProps {
  currentLang: LanguageCode;
}

const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = DICTIONARY[currentLang] || DICTIONARY['en'];
  
  // Quick links mapped to real MoSJE URLs
  const quickLinks = [
    { label: 'Accessibility Statement', url: 'https://socialjustice.gov.in/common/1377' },
    { label: 'Help', url: 'https://socialjustice.gov.in/common/1376' },
    { label: 'Privacy Policy', url: 'https://socialjustice.gov.in/common/1379' },
    { label: 'Hyperlinking Policy', url: 'https://socialjustice.gov.in/common/1380' },
    { label: 'Copyright Policy', url: 'https://socialjustice.gov.in/common/1381' },
    { label: 'Feedback', url: 'https://socialjustice.gov.in/feedback' },
    { label: 'Careers', url: 'https://socialjustice.gov.in/whats-new/76720' },
    { label: 'Sitemap', url: 'https://socialjustice.gov.in/sitemap' },
    { label: 'Terms & Conditions', url: 'https://socialjustice.gov.in/common/1382' },
  ];

  const govtLinks = [
    { label: 'National Portal of India', url: 'https://india.gov.in' },
    { label: 'MyGov', url: 'https://www.mygov.in' },
    { label: 'Digital India', url: 'https://digitalindia.gov.in' },
    { label: 'DBT Bharat', url: 'https://dbtbharat.gov.in' },
    { label: 'PMO India', url: 'https://www.pmindia.gov.in' },
  ];

  // Official social media URLs
  const socialLinks = {
    facebook: 'https://www.facebook.com/goimsje',
    x: 'https://x.com/MSJEGOI',
    youtube: 'https://www.youtube.com/@ministryofsocialjustice511',
    instagram: 'https://www.instagram.com/msjegoi/',
  };

  return (
    <footer className="bg-[#1b1b1b] text-gray-300 mt-auto border-t-4 border-tiranga-saffron font-sans">
      {/* Main Footer Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: Address and Contact Information */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-tiranga-saffron shrink-0 mt-1" />
                <span>
                  Ministry of Social Justice &amp; Empowerment,<br />
                  Shastri Bhawan, C-Wing,<br />
                  Dr. Rajendra Prasad Road,<br />
                  New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-tiranga-saffron shrink-0" />
                <span>011-2338XXXX, 011-2338XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-tiranga-saffron shrink-0" />
                <a
                  href="mailto:helpdesk-sje@gov.in"
                  className="hover:text-white transition-colors"
                >
                  helpdesk-sje@gov.in
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-tiranga-saffron transition-colors flex items-center gap-2"
                  >
                    <span className="text-gray-600 text-xs">›</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: External Government Sites */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 inline-block">
              Government Sites
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {govtLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-tiranga-green transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink
                      size={14}
                      className="text-gray-600 group-hover:text-tiranga-green"
                    />{' '}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Media & Stats */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2 inline-block">
              Connect With Us
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Follow us on social media for the latest updates on schemes, scholarships and DBT.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mb-6">
              {/* Facebook */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all transform hover:scale-110 border border-gray-700"
                aria-label="MoSJE on Facebook"
              >
                <Facebook size={20} />
              </a>

              {/* X (Twitter new logo) */}
              <a
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-black hover:text-white transition-all transform hover:scale-110 border border-gray-700"
                aria-label="MoSJE on X"
              >
                <XIcon size={20} />
              </a>

              {/* YouTube */}
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all transform hover:scale-110 border border-gray-700"
                aria-label="MoSJE on YouTube"
              >
                <Youtube size={20} />
              </a>

              {/* Instagram */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:text-white transition-all transform hover:scale-110 border border-gray-700"
                aria-label="MoSJE on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>

            {/* Visitor Stats */}
            <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
              <p className="text-xs text-gray-400 mb-2 flex justify-between">
                <span>Visitor Count:</span>
                <span className="text-white font-mono font-bold tracking-wider">
                  1,24,59,032
                </span>
              </p>
              <p className="text-xs text-gray-400 flex justify-between">
                <span>Last Updated:</span>
                <span className="text-white font-mono">
                  {new Date().toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Bar: Ownership and Logos */}
      <div className="bg-black py-6 text-center px-4 border-t border-gray-800">
        <div className="container mx-auto">
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {t.footerContent}
          </p>
          
          <div className="flex justify-center items-center gap-4">
            <div className="h-8 w-[1px] bg-gray-700" />
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-gray-400 uppercase">Initiative of</span>
              <span className="font-bold text-white tracking-widest">Digital India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Green Strip */}
      <div className="h-3 w-full bg-tiranga-green" />
    </footer>
  );
};

export default Footer;
