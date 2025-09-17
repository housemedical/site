import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import newsImage from '../assets/images/oxford_street_heritage_3.jpg';

const NewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const news = [
    {
      id: 1,
      title: "Oxford Street Transformation Project Unveiled",
      excerpt: "Major redevelopment plans announced to enhance the shopping experience while preserving the street's historic character.",
      date: "2024-03-15",
      category: "Development",
      image: newsImage,
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Sustainability Initiatives Launch",
      excerpt: "OSDC introduces comprehensive environmental programs to make Oxford Street a leader in sustainable retail.",
      date: "2024-03-10",
      category: "Sustainability",
      image: newsImage,
      readTime: "2 min read"
    },
    {
      id: 3,
      title: "Christmas Lights Festival Returns",
      excerpt: "Annual celebration brings festive cheer to Oxford Street with spectacular light displays and special events.",
      date: "2024-03-05",
      category: "Events",
      image: newsImage,
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Digital Innovation Hub Opens",
      excerpt: "New technology center showcases the future of retail and provides support for local businesses.",
      date: "2024-02-28",
      category: "Technology",
      image: newsImage,
      readTime: "5 min read"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, news.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, news.length - 2)) % Math.max(1, news.length - 2));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="news" className="luxury-spacing bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heritage-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            News & Updates
          </h2>
          <p className="heritage-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about the latest developments, events, and initiatives on Oxford Street.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <div className="luxury-card bg-white rounded-lg overflow-hidden shadow-xl luxury-motion">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto">
                <img
                  src={news[0].image}
                  alt={news[0].title}
                  className="responsive-image h-full"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <span className="heritage-sans text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                  <span className="heritage-sans text-xs text-muted-foreground ml-3">
                    {news[0].category}
                  </span>
                </div>
                <h3 className="heritage-serif text-2xl md:text-3xl font-bold text-primary mb-4">
                  {news[0].title}
                </h3>
                <p className="heritage-sans text-muted-foreground mb-6">
                  {news[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="heritage-sans">{formatDate(news[0].date)}</span>
                    <span className="heritage-sans ml-4">{news[0].readTime}</span>
                  </div>
                  <Button className="touch-target focus-visible:focus-visible">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="heritage-serif text-2xl font-semibold text-primary">
              Latest Articles
            </h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="touch-target focus-visible:focus-visible"
                aria-label="Previous articles"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="touch-target focus-visible:focus-visible"
                aria-label="Next articles"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {news.slice(1).map((article, index) => (
                <div key={article.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                  <div className="luxury-card bg-white rounded-lg overflow-hidden shadow-md luxury-motion h-full">
                    <div className="h-48">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="responsive-image h-full"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="heritage-sans text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                          {article.category}
                        </span>
                      </div>
                      <h4 className="heritage-serif text-lg font-semibold text-primary mb-3 line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="heritage-sans text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="heritage-sans">{formatDate(article.date)}</span>
                        </div>
                        <span className="heritage-sans">{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary text-white p-8 rounded-lg text-center">
          <h3 className="heritage-serif text-2xl font-bold mb-4">
            Stay Updated
          </h3>
          <p className="heritage-sans mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, events, and updates about Oxford Street directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="heritage-sans flex-1 px-4 py-2 rounded-md text-foreground focus-visible:focus-visible touch-target"
            />
            <Button 
              variant="secondary"
              className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
            >
              Subscribe
            </Button>
          </div>
          <p className="heritage-sans text-xs opacity-75 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* View All Articles */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
          >
            View All Articles
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

