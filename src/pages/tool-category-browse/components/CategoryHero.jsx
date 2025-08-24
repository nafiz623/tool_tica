import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryHero = ({ category, totalTools }) => {
  const categoryData = {
    'text-tools': {
      name: 'Text Tools',
      description: 'Transform, format, and manipulate text with powerful processing tools',
      icon: 'Type',
      color: 'from-blue-600 to-purple-600',
      bgPattern: 'text-blue-400/10'
    },
    'image-tools': {
      name: 'Image Tools',
      description: 'Edit, convert, and optimize images with professional-grade tools',
      icon: 'Image',
      color: 'from-green-600 to-blue-600',
      bgPattern: 'text-green-400/10'
    },
    'pdf-tools': {
      name: 'PDF Tools',
      description: 'Process, convert, and manipulate PDF documents efficiently',
      icon: 'FileText',
      color: 'from-red-600 to-pink-600',
      bgPattern: 'text-red-400/10'
    },
    'developer-tools': {
      name: 'Developer Tools',
      description: 'Code utilities and development helpers for programmers',
      icon: 'Code',
      color: 'from-purple-600 to-indigo-600',
      bgPattern: 'text-purple-400/10'
    },
    'seo-tools': {
      name: 'SEO Tools',
      description: 'Optimize your website for search engines and improve rankings',
      icon: 'TrendingUp',
      color: 'from-orange-600 to-red-600',
      bgPattern: 'text-orange-400/10'
    },
    'calculators': {
      name: 'Calculators',
      description: 'Mathematical and financial calculators for everyday use',
      icon: 'Calculator',
      color: 'from-cyan-600 to-blue-600',
      bgPattern: 'text-cyan-400/10'
    },
    'converters': {
      name: 'Converters',
      description: 'Convert between different units, formats, and data types',
      icon: 'RefreshCw',
      color: 'from-yellow-600 to-orange-600',
      bgPattern: 'text-yellow-400/10'
    },
    'generators': {
      name: 'Generators',
      description: 'Generate content, codes, and data for various purposes',
      icon: 'Zap',
      color: 'from-pink-600 to-purple-600',
      bgPattern: 'text-pink-400/10'
    }
  };

  const currentCategory = categoryData?.[category] || {
    name: 'All Tools',
    description: 'Discover all available tools across different categories',
    icon: 'Grid3X3',
    color: 'from-violet-600 to-purple-600',
    bgPattern: 'text-violet-400/10'
  };

  return (
    <div className={`relative bg-gradient-to-br ${currentCategory?.color} overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 transform rotate-12">
          <Icon name={currentCategory?.icon} size={120} className={currentCategory?.bgPattern} />
        </div>
        <div className="absolute bottom-10 right-10 transform -rotate-12">
          <Icon name={currentCategory?.icon} size={80} className={currentCategory?.bgPattern} />
        </div>
        <div className="absolute top-1/2 left-1/3 transform -rotate-45">
          <Icon name={currentCategory?.icon} size={60} className={currentCategory?.bgPattern} />
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          {/* Category Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Icon name={currentCategory?.icon} size={32} color="white" className="lg:w-10 lg:h-10" />
            </div>
          </div>

          {/* Category Name */}
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {currentCategory?.name}
          </h1>

          {/* Description */}
          <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-3xl mx-auto">
            {currentCategory?.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Tool" size={20} />
              <span className="text-sm lg:text-base font-medium">
                {totalTools} Tools Available
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} />
              <span className="text-sm lg:text-base font-medium">
                10K+ Users
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} />
              <span className="text-sm lg:text-base font-medium">
                4.8 Rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;