import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, BookOpen, Briefcase } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  year: string;
  title: string;
  description: string;
  type: 'education' | 'certification' | 'experience' | 'achievement';
  icon: any;
  details?: string[];
}

const InteractiveTimeline = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: 'December 2024',
      year: '2024',
      title: 'Introduction to Cybersecurity - Cisco',
      description: 'Advanced cybersecurity certification focusing on threat analysis and network security',
      type: 'certification',
      icon: Award,
      details: [
        'Network security protocols and implementation',
        'Threat detection and mitigation strategies',
        'Security compliance and best practices',
        'Cisco Credly verified certification'
      ]
    },
    {
      id: '2',
      date: 'Fall 2024',
      year: '2024',
      title: 'Project Management II - Olympic College',
      description: 'Advanced project management coursework with 4.0 GPA achievement',
      type: 'education',
      icon: BookOpen,
      details: [
        'Advanced project lifecycle management',
        'Risk assessment and mitigation strategies',
        'Stakeholder management and communication',
        'Agile and traditional methodologies'
      ]
    },
    {
      id: '3',
      date: 'Spring 2024',
      year: '2024',
      title: 'Project Management I - Olympic College',
      description: 'Foundational project management education with perfect 4.0 GPA',
      type: 'education',
      icon: BookOpen,
      details: [
        'Project management fundamentals',
        'Planning and scheduling techniques',
        'Budget management and resource allocation',
        'Quality assurance and control'
      ]
    },
    {
      id: '4',
      date: 'February 2024',
      year: '2024',
      title: 'Introduction to Data Science - Cisco',
      description: 'Data analysis and visualization certification',
      type: 'certification',
      icon: Award,
      details: [
        'Data analysis methodologies',
        'Statistical analysis and interpretation',
        'Data visualization techniques',
        'Business intelligence applications'
      ]
    },
    {
      id: '5',
      date: 'December 2023',
      year: '2023',
      title: 'CCNA Switching, Routing & Wireless - Cisco',
      description: 'Advanced networking certification in enterprise infrastructure',
      type: 'certification',
      icon: Award,
      details: [
        'Advanced routing and switching protocols',
        'Wireless network design and implementation',
        'Network troubleshooting and optimization',
        'Enterprise network security'
      ]
    },
    {
      id: '6',
      date: '2018-Present',
      year: '2018',
      title: 'Senior IT Infrastructure Specialist - Dell Technologies',
      description: 'Leading cross-functional teams and managing critical infrastructure projects',
      type: 'experience',
      icon: Briefcase,
      details: [
        'Led teams of up to 12 technical professionals',
        'Managed infrastructure for 1000+ users with zero downtime',
        'Implemented process improvements reducing resolution time by 35%',
        'Coordinated complex system migrations and upgrades'
      ]
    },
    {
      id: '7',
      date: '2022',
      year: '2022',
      title: 'Bachelor of Applied Science - Olympic College',
      description: 'Started Information Systems degree program with 3.94 GPA',
      type: 'education',
      icon: BookOpen,
      details: [
        'Information Systems specialization',
        'Maintained 3.94 cumulative GPA',
        'President\'s Scholar recognition',
        'Expected graduation Spring 2026'
      ]
    }
  ];

  const filteredEvents = timelineEvents.filter(event => {
    if (selectedFilter === 'all') return true;
    return event.type === selectedFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education': return 'text-primary-blue';
      case 'certification': return 'text-teal-blue';
      case 'experience': return 'text-primary-blue';
      case 'achievement': return 'text-teal-blue';
      default: return 'text-primary-blue';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
      case 'certification': return 'bg-teal-blue/10 text-teal-blue border-teal-blue/20';
      case 'experience': return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
      case 'achievement': return 'bg-teal-blue/10 text-teal-blue border-teal-blue/20';
      default: return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Timeline
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto mt-4 rounded"></div>
          </h2>
          <p className="text-xl text-gray-600">Track my journey through education, certifications, and professional growth</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('all')}
            className={`${selectedFilter === 'all' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Show All
          </Button>
          <Button
            variant={selectedFilter === 'education' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('education')}
            className={`${selectedFilter === 'education' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Education
          </Button>
          <Button
            variant={selectedFilter === 'certification' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('certification')}
            className={`${selectedFilter === 'certification' ? 'bg-teal-600 text-white hover:bg-teal-700' : 'border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white'}`}
          >
            <Award className="h-4 w-4 mr-2" />
            Certifications
          </Button>
          <Button
            variant={selectedFilter === 'experience' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('experience')}
            className={`${selectedFilter === 'experience' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Experience
          </Button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-teal-500 h-full"></div>
          
          <div className="space-y-12">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card 
                    className={`bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedEvent === event.id ? 'border-blue-500 shadow-lg transform scale-105' : 'hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className={`${getTypeBadgeColor(event.type)} border`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      {selectedEvent === event.id && event.details && (
                        <div className="mt-4 space-y-2">
                          {event.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className="relative flex items-center justify-center w-2/12">
                  <div className={`w-12 h-12 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-lg ${getTypeColor(event.type)}`}>
                    <event.icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Year */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                  <div className="text-3xl font-bold text-blue-600 opacity-60">
                    {event.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 text-center">
          <Card className="professional-card bg-gradient-to-r from-primary-blue/5 via-teal-blue/5 to-primary-blue/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-charcoal-black mb-4">Current Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">CAPM Certification</span>
                    <span className="text-sm text-gray-500">75% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-blue to-teal-blue h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Bachelor's Degree (Expected Spring 2026)</span>
                    <span className="text-sm text-gray-500">65% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-blue to-teal-blue h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Last updated: January 2025</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;