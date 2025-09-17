import React from 'react';
import { Button } from './ui/button';
import { ExternalLink, Calendar, FileText, Users, Gavel } from 'lucide-react';

const GovernanceSection = () => {
  const latestDecisions = [
    {
      id: 1,
      title: "Oxford Street Pedestrianisation Phase 2",
      date: "2024-03-10",
      status: "Approved",
      summary: "Approval for the second phase of pedestrianisation improvements between Oxford Circus and Tottenham Court Road."
    },
    {
      id: 2,
      title: "Sustainability Framework 2024-2027",
      date: "2024-03-05",
      status: "Under Review",
      summary: "Comprehensive sustainability strategy including carbon reduction targets and green infrastructure investments."
    },
    {
      id: 3,
      title: "Small Business Support Grant Scheme",
      date: "2024-02-28",
      status: "Approved",
      summary: "£2M funding allocation for supporting independent retailers and local businesses on Oxford Street."
    },
    {
      id: 4,
      title: "Heritage Building Conservation Guidelines",
      date: "2024-02-20",
      status: "Consultation",
      summary: "New guidelines for the preservation and adaptive reuse of historic buildings along Oxford Street."
    }
  ];

  const upcomingMeetings = [
    {
      title: "Board Meeting",
      date: "2024-04-15",
      time: "10:00 AM",
      location: "OSDC Offices, Oxford Street"
    },
    {
      title: "Public Consultation Session",
      date: "2024-04-22",
      time: "6:30 PM",
      location: "Westminster Council Chambers"
    },
    {
      title: "Planning Committee",
      date: "2024-04-30",
      time: "2:00 PM",
      location: "Virtual Meeting"
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
    <section id="governance" className="luxury-spacing bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="heritage-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Governance
          </h2>
          <p className="heritage-sans text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent governance and democratic decision-making processes ensure accountability and community involvement in Oxford Street's development.
          </p>
        </div>

        {/* Modern.Gov Integration */}
        <div className="mb-12">
          <div className="luxury-card bg-white p-8 rounded-lg shadow-lg text-center">
            <Gavel className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="heritage-serif text-2xl font-semibold text-primary mb-4">
              Official Governance Portal
            </h3>
            <p className="heritage-sans text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access our complete governance information, including meeting agendas, minutes, reports, and decision records through our official Modern.Gov portal.
            </p>
            <Button 
              size="lg"
              className="heritage-sans font-semibold touch-target focus-visible:focus-visible"
              onClick={() => window.open('https://moderngov.example.com/osdc', '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Visit Modern.Gov Portal
            </Button>
          </div>
        </div>

        {/* Latest Decisions Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="heritage-serif text-2xl font-semibold text-primary mb-6">
              Latest Decisions
            </h3>
            <div className="space-y-4">
              {latestDecisions.map((decision) => (
                <div key={decision.id} className="luxury-card bg-white p-6 rounded-lg shadow-md luxury-motion">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="heritage-serif text-lg font-semibold text-primary flex-1 mr-4">
                      {decision.title}
                    </h4>
                    <span className={`heritage-sans text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(decision.status)}`}>
                      {decision.status}
                    </span>
                  </div>
                  <p className="heritage-sans text-sm text-muted-foreground mb-3">
                    {decision.summary}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span className="heritage-sans">{formatDate(decision.date)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full heritage-sans font-semibold touch-target focus-visible:focus-visible"
              >
                View All Decisions
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div>
            <h3 className="heritage-serif text-2xl font-semibold text-primary mb-6">
              Upcoming Meetings
            </h3>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting, index) => (
                <div key={index} className="luxury-card bg-white p-6 rounded-lg shadow-md luxury-motion">
                  <h4 className="heritage-serif text-lg font-semibold text-primary mb-2">
                    {meeting.title}
                  </h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="heritage-sans">{formatDate(meeting.date)} at {meeting.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="heritage-sans">{meeting.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="w-full heritage-sans font-semibold touch-target focus-visible:focus-visible"
              >
                View Meeting Calendar
                <Calendar className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Governance Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="luxury-card bg-white p-6 rounded-lg shadow-md text-center luxury-motion">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="heritage-serif text-lg font-semibold text-primary mb-3">
              Meeting Minutes
            </h4>
            <p className="heritage-sans text-sm text-muted-foreground mb-4">
              Access detailed records of all board meetings and committee discussions.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="heritage-sans touch-target focus-visible:focus-visible"
            >
              View Minutes
            </Button>
          </div>

          <div className="luxury-card bg-white p-6 rounded-lg shadow-md text-center luxury-motion">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="heritage-serif text-lg font-semibold text-primary mb-3">
              Committee Structure
            </h4>
            <p className="heritage-sans text-sm text-muted-foreground mb-4">
              Learn about our governance structure and committee responsibilities.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="heritage-sans touch-target focus-visible:focus-visible"
            >
              View Structure
            </Button>
          </div>

          <div className="luxury-card bg-white p-6 rounded-lg shadow-md text-center luxury-motion">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="heritage-serif text-lg font-semibold text-primary mb-3">
              Public Participation
            </h4>
            <p className="heritage-sans text-sm text-muted-foreground mb-4">
              Find out how you can participate in our governance processes.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              className="heritage-sans touch-target focus-visible:focus-visible"
            >
              Get Involved
            </Button>
          </div>
        </div>

        {/* API Integration Note */}
        <div className="mt-12 bg-primary/5 border border-primary/20 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <div>
              <h4 className="heritage-sans font-semibold text-primary mb-2">
                API Integration Ready
              </h4>
              <p className="heritage-sans text-sm text-muted-foreground">
                This section is designed to integrate with the Modern.Gov API for real-time updates of decisions, meetings, and governance documents. The placeholder content shown above will be replaced with live data once the API connection is established.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;

