import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, MapPin } from 'lucide-react';
import heroImage from '../assets/images/oxford_street_heritage_1.jpg';

const Hero = () => {
  return (
    <section 
      id="home"
      className="hero-section relative flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary/40"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="heritage-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Oxford Street
          <span className="block gold-accent">Development Corporation</span>
        </h1>
        
        <p className="heritage-sans text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-95">
          Shaping the future of London's most iconic shopping destination while preserving its rich heritage and character.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="heritage-sans bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-3 touch-target focus-visible:focus-visible luxury-motion"
          >
            Explore Oxford Street
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="heritage-sans border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 touch-target focus-visible:focus-visible luxury-motion"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Visit Us
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="luxury-motion">
            <div className="heritage-serif text-3xl md:text-4xl font-bold gold-accent mb-2">300+</div>
            <div className="heritage-sans text-sm md:text-base opacity-90">Shops & Restaurants</div>
          </div>
          <div className="luxury-motion">
            <div className="heritage-serif text-3xl md:text-4xl font-bold gold-accent mb-2">200M+</div>
            <div className="heritage-sans text-sm md:text-base opacity-90">Annual Visitors</div>
          </div>
          <div className="luxury-motion">
            <div className="heritage-serif text-3xl md:text-4xl font-bold gold-accent mb-2">1.5mi</div>
            <div className="heritage-sans text-sm md:text-base opacity-90">Of Shopping Excellence</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

