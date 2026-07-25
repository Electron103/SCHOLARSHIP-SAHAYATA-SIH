import React from 'react';

interface AboutPageProps {
  title: string;
  content: string[];
}

// Reusable component for displaying static content pages (About Us, Scheme Details, etc.)
const AboutPage: React.FC<AboutPageProps> = ({ title, content }) => {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      {/* Back button below navbar + emblem, above content card */}

      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Page Title Header with Decorative Elements */}
        <div className="bg-tiranga-blue p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-tiranga-saffron/20 rounded-full -ml-12 -mb-12"></div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white relative z-10 border-l-4 border-tiranga-saffron pl-4">
            {title}
          </h1>
        </div>
        
        {/* Content Body */}
        <div className="p-6 md:p-10 space-y-6 text-gray-700 leading-relaxed text-lg">
          {content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom Decorative Stripe */}
        <div className="h-2 bg-gradient-to-r from-tiranga-saffron via-white to-tiranga-green"></div>
      </div>
    </div>
  );
};

export default AboutPage;
