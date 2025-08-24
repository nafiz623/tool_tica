import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ 
  customBreadcrumbs = null,
  className = "",
  showHome = true,
  separator = "ChevronRight"
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const breadcrumbs = [];
    
    if (showHome) {
      breadcrumbs?.push({
        label: 'Home',
        path: '/homepage',
        icon: 'Home'
      });
    }

    switch (location?.pathname) {
      case '/homepage':
        if (!showHome) {
          breadcrumbs?.push({
            label: 'Home',
            path: '/homepage',
            icon: 'Home'
          });
        }
        break;

      case '/tool-category-browse':
        const category = searchParams?.get('category');
        breadcrumbs?.push({
          label: 'Browse Tools',
          path: '/tool-category-browse',
          icon: 'Grid3X3'
        });
        if (category) {
          breadcrumbs?.push({
            label: formatCategoryName(category),
            path: `/tool-category-browse?category=${category}`,
            icon: getCategoryIcon(category),
            current: true
          });
        }
        break;

      case '/search-results':
        const query = searchParams?.get('q');
        breadcrumbs?.push({
          label: 'Search Results',
          path: '/search-results',
          icon: 'Search'
        });
        if (query) {
          breadcrumbs?.push({
            label: `"${query}"`,
            path: `/search-results?q=${query}`,
            current: true
          });
        }
        break;

      case '/individual-tool-page':
        const tool = searchParams?.get('tool');
        const toolCategory = searchParams?.get('category');
        
        if (toolCategory) {
          breadcrumbs?.push({
            label: 'Browse Tools',
            path: '/tool-category-browse',
            icon: 'Grid3X3'
          });
          breadcrumbs?.push({
            label: formatCategoryName(toolCategory),
            path: `/tool-category-browse?category=${toolCategory}`,
            icon: getCategoryIcon(toolCategory)
          });
        }
        
        if (tool) {
          breadcrumbs?.push({
            label: formatToolName(tool),
            path: `/individual-tool-page?tool=${tool}`,
            icon: 'Tool',
            current: true
          });
        }
        break;

      case '/privacy-policy-legal':
        breadcrumbs?.push({
          label: 'Privacy & Legal',
          path: '/privacy-policy-legal',
          icon: 'Shield',
          current: true
        });
        break;

      default:
        break;
    }

    return breadcrumbs;
  };

  const formatCategoryName = (slug) => {
    return slug?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
  };

  const formatToolName = (slug) => {
    return slug?.split('-')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ');
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'text-tools': 'Type',
      'image-tools': 'Image',
      'pdf-tools': 'FileText',
      'developer-tools': 'Code',
      'seo-tools': 'TrendingUp',
      'calculators': 'Calculator',
      'converters': 'RefreshCw',
      'generators': 'Zap'
    };
    return iconMap?.[category] || 'Folder';
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name={separator} 
                size={14} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {breadcrumb?.current ? (
              <span className="flex items-center space-x-1.5 text-foreground font-medium">
                {breadcrumb?.icon && (
                  <Icon 
                    name={breadcrumb?.icon} 
                    size={14} 
                    className="text-primary" 
                  />
                )}
                <span className="truncate max-w-xs">{breadcrumb?.label}</span>
              </span>
            ) : (
              <Link
                to={breadcrumb?.path}
                className="flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-white/5 px-2 py-1 rounded"
              >
                {breadcrumb?.icon && (
                  <Icon 
                    name={breadcrumb?.icon} 
                    size={14} 
                  />
                )}
                <span className="truncate max-w-xs">{breadcrumb?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;