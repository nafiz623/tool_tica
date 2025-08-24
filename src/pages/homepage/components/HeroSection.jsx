import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularSearches = [
    'PDF to Text',
    'Image Converter',
    'Text Case Converter',
    'QR Code Generator',
    'Password Generator'
  ];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-primary opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-500/20"></div>
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 glass opacity-30"></div>
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/10 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Privacy-First
            <span className="block gradient-accent bg-clip-text text-transparent">
              Online Tools
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
            Process your files securely with client-side tools. No uploads, no data sharing, complete privacy guaranteed.
          </p>
          <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-green-400" />
              <span>100% Client-Side</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-green-400" />
              <span>No Data Upload</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} className="text-green-400" />
              <span>Instant Processing</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative glass-card p-2 rounded-2xl">
              <div className="flex items-center">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-6 text-white/60" 
                />
                <input
                  type="text"
                  placeholder="Search for tools like 'PDF converter', 'image resizer'..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-14 pr-4 py-4 bg-transparent text-white placeholder-white/60 text-lg focus:outline-none"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="mr-2 px-8 py-4 bg-white text-primary hover:bg-white/90 font-semibold"
                >
                  Search
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-6">
            <p className="text-white/70 text-sm mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`/search-results?q=${encodeURIComponent(search)}`)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/90 text-sm rounded-full transition-all duration-200 hover:scale-105"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            variant="outline"
            onClick={() => navigate('/tool-category-browse')}
            className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50"
          >
            <Icon name="Grid3X3" size={20} className="mr-3" />
            Browse All Tools
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/privacy-policy-legal')}
            className="px-8 py-4 text-lg font-semibold text-white/90 hover:text-white hover:bg-white/10"
          >
            <Icon name="Shield" size={20} className="mr-3" />
            Privacy Policy
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50+</div>
            <div className="text-white/70 text-sm">Tools Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-white/70 text-sm">Privacy Safe</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0s</div>
            <div className="text-white/70 text-sm">Upload Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">∞</div>
            <div className="text-white/70 text-sm">Usage Limit</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;