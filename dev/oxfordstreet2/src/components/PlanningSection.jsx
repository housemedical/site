import React from 'react';
import { Button } from './ui/button';
import { ExternalLink, FileText, MapPin, Clock, AlertCircle } from 'lucide-react';

const PlanningSection = () => {
  const planningApplications = [
    {
      id: "24/00123/FULL",
      address: "150-156 Oxford Street",
      description: "Change of use from retail to mixed retail and residential",
      status: "Under Review",
      submittedDate: "2024-03-01",
      targetDate: "2024-04-15"
    },
    {
      id: "24/00098/ADV",
      address: "Oxford Circus Station",
      description: "Installation of new digital advertising displays",
      status: "Approved",
      submittedDate: "2024-02-15",
      targetDate: "2024-03-30"
    },
    {
      id: "24/00087/LBC",
      address: "200-210 Oxford Street",
      description: "Listed building consent for facade restoration",
      status: "Consultation",
      submittedDate: "2024-02-10",
      targetDate: "2024-04-10"
    }
  ];

  const planningGuidelines = [
    {
      title: "Design Guidelines",
      description: "Standards for shopfronts, signage, and architectural elements",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Heritage Requirements",
      description: "Special considerations for listed buildings and conservation areas",
      icon: <AlertCircle className="h-6 w-6" />
    },
    {
      title: "Sustainability Standards",
      description: "Environmental requirements and energy efficiency guidelines",
      icon: <MapPin className="h-6 w-6" />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Consultation':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <section id="planning" className="luxury-spacing bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heritage-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Planning
          </h2>
          <p className="heritage-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Access planning applications, guidelines, and resources for development along Oxford Street.
          </p>
        </div>

        {/* Arcus Integration */}
        <div className="mb-12">
          <div className="luxury-card bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-lg border border-primary/20">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="heritage-serif text-2xl font-semibold text-primary mb-4">
                Arcus Planning System
              </h3>
              <p className="heritage-sans text-muted-foreground mb-6 max-w-2xl mx-auto">
                Access the official planning portal for Westminster Council to view applications, submit new proposals, and track planning decisions for Oxford Street developments.
              </p>
              <Button 
                size="lg"
                className="heritage-sans font-semibold touch-target focus-visible:focus-visible mr-4"
                onClick={() => window.open('https://arcus.westminster.gov.uk', '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Visit Arcus Portal
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
              >
                Planning Guidelines
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="mb-12">
          <h3 className="heritage-serif text-2xl font-semibold text-primary mb-6">
            Recent Planning Applications
          </h3>
          <div className="space-y-4">
            {planningApplications.map((application) => (
              <div key={application.id} className="luxury-card bg-white border border-border p-6 rounded-lg luxury-motion">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
                  <div>
                    <h4 className="heritage-serif text-lg font-semibold text-primary mb-1">
                      {application.id}
                    </h4>
                    <p className="heritage-sans text-sm text-muted-foreground">
                      {application.address}
                    </p>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <p className="heritage-sans text-sm text-foreground mb-2">
                      {application.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="heritage-sans">Submitted: {formatDate(application.submittedDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="heritage-sans">Target: {formatDate(application.targetDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between lg:justify-end">
                    <span className={`heritage-sans text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="heritage-sans ml-3 touch-target focus-visible:focus-visible"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Button 
              variant="outline"
              className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
            >
              View All Applications
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Planning Guidelines */}
        <div className="mb-12">
          <h3 className="heritage-serif text-2xl font-semibold text-primary mb-6 text-center">
            Planning Guidelines & Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planningGuidelines.map((guideline, index) => (
              <div key={index} className="luxury-card bg-secondary/30 p-6 rounded-lg text-center luxury-motion">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {guideline.icon}
                </div>
                <h4 className="heritage-serif text-lg font-semibold text-primary mb-3">
                  {guideline.title}
                </h4>
                <p className="heritage-sans text-sm text-muted-foreground mb-4">
                  {guideline.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="heritage-sans touch-target focus-visible:focus-visible"
                >
                  Download Guide
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Application Advice */}
        <div className="bg-primary text-white p-8 rounded-lg text-center mb-12">
          <h3 className="heritage-serif text-2xl font-bold mb-4">
            Pre-Application Advice
          </h3>
          <p className="heritage-sans mb-6 max-w-2xl mx-auto">
            Considering a development on Oxford Street? Our planning team offers pre-application advice to help ensure your proposal meets all requirements and has the best chance of success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
            >
              Book Consultation
            </Button>
            <Button 
              variant="outline"
              className="heritage-sans font-semibold border-white text-white hover:bg-white hover:text-primary touch-target focus-visible:focus-visible"
            >
              Download Checklist
            </Button>
          </div>
        </div>

        {/* API Integration Note */}
        <div className="bg-accent/5 border border-accent/20 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <div>
              <h4 className="heritage-sans font-semibold text-primary mb-2">
                Arcus API Integration
              </h4>
              <p className="heritage-sans text-sm text-muted-foreground">
                This section includes a placeholder for API integration with the Arcus planning system. Once connected, it will display real-time planning application data, status updates, and automated notifications for Oxford Street developments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;

