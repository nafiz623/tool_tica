import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BlogPreviewSection = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Client-Side PDF Processing',
      excerpt: 'Learn how to process PDF files entirely in your browser without uploading sensitive documents to servers. Discover the benefits of client-side processing for privacy and security.',
      author: 'Sarah Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      publishDate: '2024-08-20',
      readTime: '8 min read',
      category: 'Privacy & Security',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop',
      tags: ['PDF', 'Privacy', 'Client-Side']
    },
    {
      id: 2,
      title: 'Image Optimization Best Practices for Web Performance',
      excerpt: 'Optimize your images for better web performance with our comprehensive guide. Learn about modern formats like WebP and AVIF, compression techniques, and responsive images.',
      author: 'Mike Rodriguez',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      publishDate: '2024-08-18',
      readTime: '12 min read',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      tags: ['Images', 'Performance', 'WebP']
    },
    {
      id: 3,
      title: 'Why Privacy-First Tools Matter in 2024',
      excerpt: 'Explore the growing importance of privacy-first digital tools and how client-side processing protects your sensitive data from potential breaches and unauthorized access.',
      author: 'Emma Thompson',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      publishDate: '2024-08-15',
      readTime: '6 min read',
      category: 'Privacy & Security',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
      tags: ['Privacy', 'Security', 'Data Protection']
    }
  ];

  const handleReadMore = (postId) => {
    // In a real app, this would navigate to the blog post
    console.log(`Navigate to blog post ${postId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="BookOpen" size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              Latest Insights
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            From Our Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest tips, tutorials, and insights about privacy-first tools, 
            web development, and digital security best practices.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts?.map((post) => (
            <article key={post?.id} className="glass-card rounded-xl overflow-hidden hover:shadow-elevation-2 transition-all duration-200 group">
              {/* Post Image */}
              <div className="relative overflow-hidden h-48">
                <Image
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                    {post?.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center space-x-4 mb-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={post?.authorAvatar}
                      alt={post?.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{post?.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(post?.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{post?.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {post?.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post?.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-surface/50 text-muted-foreground text-xs rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <Button
                  variant="ghost"
                  onClick={() => handleReadMore(post?.id)}
                  className="w-full justify-between p-0 h-auto text-sm font-medium text-accent hover:text-accent-foreground"
                >
                  <span>Read More</span>
                  <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blog Posts Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => console.log('Navigate to blog')}
            className="px-8 py-4 text-lg font-semibold"
          >
            <Icon name="BookOpen" size={20} className="mr-3" />
            View All Articles
            <Icon name="ArrowRight" size={18} className="ml-3" />
          </Button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-8 rounded-xl">
              <Icon name="Mail" size={32} className="text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-6">
                Get the latest articles, tool updates, and privacy tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-surface/50 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
                <Button variant="default" className="px-8 py-3">
                  Subscribe
                  <Icon name="Send" size={16} className="ml-2" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;