import React from 'react';
import { Button } from './ui/button';
import { Users, Target, Award, FileText } from 'lucide-react';

const AboutSection = () => {
  const boardMembers = [
    {
      name: "Sarah Johnson",
      role: "Chair",
      bio: "Former retail executive with 20 years of experience in urban development"
    },
    {
      name: "Michael Chen",
      role: "Vice Chair",
      bio: "Urban planning specialist and sustainable development advocate"
    },
    {
      name: "Emma Thompson",
      role: "Board Member",
      bio: "Heritage conservation expert and community engagement specialist"
    },
    {
      name: "David Williams",
      role: "Board Member",
      bio: "Business development leader with expertise in retail transformation"
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description: "To enhance Oxford Street as a world-class destination while preserving its unique character and heritage for future generations."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Our Vision",
      description: "A thriving, sustainable, and inclusive Oxford Street that serves as a model for urban retail districts worldwide."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Our Values",
      description: "Collaboration, innovation, sustainability, and respect for heritage guide everything we do."
    }
  ];

  return (
    <section id="about" className="luxury-spacing bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heritage-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            About OSDC
          </h2>
          <p className="heritage-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The Oxford Street Development Corporation is dedicated to enhancing London's premier shopping destination through thoughtful development and community engagement.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((item, index) => (
            <div key={index} className="text-center luxury-motion">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                {item.icon}
              </div>
              <h3 className="heritage-serif text-xl font-semibold text-primary mb-3">
                {item.title}
              </h3>
              <p className="heritage-sans text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="heritage-serif text-2xl font-semibold text-primary mb-6">
              Our Story
            </h3>
            <div className="space-y-4 heritage-sans text-muted-foreground">
              <p>
                Established in 2020, the Oxford Street Development Corporation was created to oversee the strategic development and enhancement of one of the world's most famous shopping streets. Our mandate encompasses everything from infrastructure improvements to business support and community engagement.
              </p>
              <p>
                We work closely with retailers, local authorities, transport providers, and community groups to ensure that Oxford Street continues to thrive as a destination that serves both visitors and residents while respecting its rich history.
              </p>
              <p>
                Our approach balances commercial success with social responsibility, environmental sustainability, and heritage preservation. We believe that Oxford Street's future lies in embracing innovation while honoring its past.
              </p>
            </div>
          </div>
          
          <div className="bg-secondary/30 p-8 rounded-lg">
            <h3 className="heritage-serif text-xl font-semibold text-primary mb-6">
              Key Achievements
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="heritage-sans font-semibold text-primary">Infrastructure Investment</h4>
                  <p className="heritage-sans text-sm text-muted-foreground">£50M invested in street improvements and accessibility enhancements</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="heritage-sans font-semibold text-primary">Business Support</h4>
                  <p className="heritage-sans text-sm text-muted-foreground">Over 200 businesses supported through development programs</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="heritage-sans font-semibold text-primary">Sustainability Initiatives</h4>
                  <p className="heritage-sans text-sm text-muted-foreground">30% reduction in carbon footprint through green initiatives</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <h4 className="heritage-sans font-semibold text-primary">Community Engagement</h4>
                  <p className="heritage-sans text-sm text-muted-foreground">Regular consultation with 15+ community groups</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Board & Leadership */}
        <div className="mb-16">
          <h3 className="heritage-serif text-2xl font-semibold text-primary mb-8 text-center">
            Board & Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardMembers.map((member, index) => (
              <div key={index} className="luxury-card bg-secondary/30 p-6 rounded-lg text-center luxury-motion">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="heritage-serif text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="heritage-serif text-lg font-semibold text-primary mb-1">
                  {member.name}
                </h4>
                <p className="heritage-sans text-sm font-medium text-accent mb-3">
                  {member.role}
                </p>
                <p className="heritage-sans text-xs text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency */}
        <div className="bg-primary text-white p-8 rounded-lg text-center">
          <FileText className="h-12 w-12 mx-auto mb-4" />
          <h3 className="heritage-serif text-2xl font-bold mb-4">
            Transparency & Accountability
          </h3>
          <p className="heritage-sans mb-6 max-w-2xl mx-auto">
            We are committed to operating with full transparency. Access our annual reports, financial statements, and meeting minutes to stay informed about our activities and decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
            >
              Annual Reports
            </Button>
            <Button 
              variant="outline"
              className="heritage-sans font-semibold border-white text-white hover:bg-white hover:text-primary touch-target focus-visible:focus-visible"
            >
              Financial Statements
            </Button>
            <Button 
              variant="outline"
              className="heritage-sans font-semibold border-white text-white hover:bg-white hover:text-primary touch-target focus-visible:focus-visible"
            >
              Meeting Minutes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

