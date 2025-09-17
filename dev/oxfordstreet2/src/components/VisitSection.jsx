import React from 'react';
import { Button } from './ui/button';
import { MapPin, Clock, Train, Calendar } from 'lucide-react';
import visitImage from '../assets/images/oxford_street_heritage_2.jpg';

const VisitSection = () => {
  const highlights = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Prime Location",
      description: "Heart of London's West End, easily accessible from anywhere in the city"
    },
    {
      icon: <Train className="h-6 w-6" />,
      title: "Transport Links",
      description: "Multiple tube stations including Oxford Circus, Bond Street, and Marble Arch"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Opening Hours",
      description: "Most shops open 10am-8pm Monday to Saturday, 12pm-6pm Sunday"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Events & Activities",
      description: "Year-round events, seasonal celebrations, and special shopping experiences"
    }
  ];

  return (
    <section id="visit" className="luxury-spacing bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heritage-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Visit Oxford Street
          </h2>
          <p className="heritage-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover everything you need to know for your visit to London's most famous shopping street.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src={visitImage}
              alt="Oxford Street bustling with shoppers and iconic red buses"
              className="responsive-image rounded-lg shadow-xl luxury-motion"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div key={index} className="luxury-card p-6 bg-white rounded-lg luxury-motion">
                  <div className="text-primary mb-3">
                    {item.icon}
                  </div>
                  <h3 className="heritage-serif text-lg font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="heritage-sans text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="heritage-serif text-xl font-semibold text-primary mb-4">
                What's On This Week
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="heritage-sans font-medium">Christmas Light Switch-On</span>
                  <span className="heritage-sans text-sm text-muted-foreground">Dec 15</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="heritage-sans font-medium">Late Night Shopping</span>
                  <span className="heritage-sans text-sm text-muted-foreground">Thu-Fri</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="heritage-sans font-medium">Street Performers</span>
                  <span className="heritage-sans text-sm text-muted-foreground">Daily</span>
                </div>
              </div>
              <Button className="w-full mt-4 touch-target focus-visible:focus-visible">
                View All Events
              </Button>
            </div>
          </div>
        </div>

        {/* Directions */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="heritage-serif text-2xl font-semibold text-primary mb-6 text-center">
            How to Get Here
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Train className="h-8 w-8 text-white" />
              </div>
              <h4 className="heritage-serif text-lg font-semibold mb-2">By Tube</h4>
              <p className="heritage-sans text-sm text-muted-foreground">
                Oxford Circus (Central, Northern, Victoria lines)<br />
                Bond Street (Central, Jubilee lines)<br />
                Marble Arch (Central line)
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
              </div>
              <h4 className="heritage-serif text-lg font-semibold mb-2">By Bus</h4>
              <p className="heritage-sans text-sm text-muted-foreground">
                Multiple bus routes serve Oxford Street<br />
                Routes: 6, 7, 10, 12, 13, 15, 23, 25, 55, 73, 94, 98, 113, 137, 139, 159, 189
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <h4 className="heritage-serif text-lg font-semibold mb-2">By Car</h4>
              <p className="heritage-sans text-sm text-muted-foreground">
                Limited parking available<br />
                NCP car parks nearby<br />
                Congestion charge applies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitSection;

