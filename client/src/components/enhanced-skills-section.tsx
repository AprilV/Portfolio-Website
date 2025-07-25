import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, Award, BookOpen, Briefcase, Clock, Filter } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'projectManagement' | 'software' | 'certifications';
  source: 'academic' | 'professional' | 'inProgress';
  description: string;
  years?: number;
  credential?: string;
}

const EnhancedSkillsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const skills: Skill[] = [
    // Technical Skills
    {
      name: 'Windows Server Administration',
      level: 95,
      category: 'technical',
      source: 'professional',
      description: '20+ years enterprise experience',
      years: 20
    },
    {
      name: 'Network Administration',
      level: 90,
      category: 'technical',
      source: 'professional',
      description: 'LAN/WAN management and optimization',
      years: 18
    },
    {
      name: 'Project Lifecycle Management',
      level: 85,
      category: 'projectManagement',
      source: 'academic',
      description: 'Formal coursework with 4.0 GPA'
    },
    {
      name: 'Cross-functional Team Leadership',
      level: 88,
      category: 'projectManagement',
      source: 'professional',
      description: 'Led teams up to 12 members at Dell',
      years: 6
    },
    {
      name: 'CAMP Certification',
      level: 75,
      category: 'certifications',
      source: 'inProgress',
      description: 'Currently pursuing - 75% complete'
    },
    {
      name: 'CompTIA Security+',
      level: 100,
      category: 'certifications',
      source: 'professional',
      description: 'Active certification',
      credential: 'Verified'
    },
    {
      name: 'Microsoft Project',
      level: 80,
      category: 'software',
      source: 'academic',
      description: 'Advanced project planning and tracking'
    },
    {
      name: 'VMware Virtualization',
      level: 85,
      category: 'technical',
      source: 'professional',
      description: 'Enterprise virtualization deployment',
      years: 8
    },
    {
      name: 'Risk Management',
      level: 82,
      category: 'projectManagement',
      source: 'academic',
      description: 'Formal Project Management II coursework'
    },
    {
      name: 'Cisco CCNA',
      level: 100,
      category: 'certifications',
      source: 'professional',
      description: 'Multiple CCNA certifications',
      credential: 'Credly Verified'
    },
    {
      name: 'Stakeholder Management',
      level: 87,
      category: 'projectManagement',
      source: 'professional',
      description: 'Cross-departmental coordination experience',
      years: 15
    },
    {
      name: 'Linux System Administration',
      level: 75,
      category: 'technical',
      source: 'professional',
      description: 'Enterprise Linux environments',
      years: 10
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesFilter = selectedFilter === 'all' || skill.source === selectedFilter;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'academic': return BookOpen;
      case 'professional': return Briefcase;
      case 'inProgress': return Clock;
      default: return Award;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'academic': return 'text-primary-blue';
      case 'professional': return 'text-teal-blue';
      case 'inProgress': return 'text-primary-blue';
      default: return 'text-primary-blue';
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'academic': return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
      case 'professional': return 'bg-teal-blue/10 text-teal-blue border-teal-blue/20';
      case 'inProgress': return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
      default: return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'from-primary-blue to-teal-blue';
      case 'projectManagement': return 'from-teal-blue to-primary-blue';
      case 'software': return 'from-primary-blue to-teal-blue';
      case 'certifications': return 'from-teal-blue to-primary-blue';
      default: return 'from-primary-blue to-teal-blue';
    }
  };

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryTitles = {
    technical: 'Technical Expertise',
    projectManagement: 'Project Management',
    software: 'Software & Tools',
    certifications: 'Certifications & Credentials'
  };

  return (
    <section id="skills" className="py-12 bg-background relative overflow-hidden" style={{paddingTop: '80px', paddingBottom: '60px'}}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-teal-blue/5 to-primary-blue/5"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="section-header">
              Enhanced Skills Matrix
              <div className="section-underline"></div>
            </h2>
          </div>
          <p className="text-xl text-gray-600 mt-6">Interactive exploration of technical expertise and professional capabilities</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search skills, technologies, or certifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-primary-blue/30 focus:border-primary-blue"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('all')}
              className={`${selectedFilter === 'all' ? 'bg-primary-blue text-white' : 'border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white'}`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Show All
            </Button>
            <Button
              variant={selectedFilter === 'academic' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('academic')}
              className={`${selectedFilter === 'academic' ? 'bg-primary-blue text-white' : 'border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white'}`}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Academic
            </Button>
            <Button
              variant={selectedFilter === 'professional' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('professional')}
              className={`${selectedFilter === 'professional' ? 'bg-teal-blue text-white' : 'border-teal-blue text-teal-blue hover:bg-teal-blue hover:text-white'}`}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Professional
            </Button>
            <Button
              variant={selectedFilter === 'inProgress' ? 'default' : 'outline'}
              onClick={() => setSelectedFilter('inProgress')}
              className={`${selectedFilter === 'inProgress' ? 'bg-primary-blue text-white' : 'border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white'}`}
            >
              <Clock className="h-4 w-4 mr-2" />
              In Progress
            </Button>
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-charcoal-black mb-6 flex items-center gap-3">
                <div className={`w-1 h-8 bg-gradient-to-b ${getCategoryColor(category)} rounded`}></div>
                {categoryTitles[category as keyof typeof categoryTitles]}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {categorySkills.map((skill, index) => {
                  const SourceIcon = getSourceIcon(skill.source);
                  return (
                    <Card key={index} className="professional-card hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-charcoal-black flex items-center gap-2">
                              <SourceIcon className={`h-5 w-5 ${getSourceColor(skill.source)}`} />
                              {skill.name}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`${getSourceBadgeColor(skill.source)} border text-xs`}>
                              {skill.source === 'inProgress' ? 'In Progress' : 
                               skill.source === 'academic' ? 'Academic' : 'Professional'}
                            </Badge>
                            {skill.years && (
                              <span className="text-xs text-gray-500">{skill.years} years</span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Proficiency Level</span>
                            <span className="text-sm font-bold text-primary-blue">{skill.level}%</span>
                          </div>
                          <Progress 
                            value={skill.level} 
                            className="h-2" 
                          />
                          {skill.credential && (
                            <div className="flex items-center gap-2 mt-2">
                              <Award className="h-4 w-4 text-teal-blue" />
                              <span className="text-xs text-teal-blue font-medium">{skill.credential}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Results Summary */}
        <div className="mt-12 text-center">
          <Card className="professional-card bg-gradient-to-r from-primary-blue/5 via-teal-blue/5 to-primary-blue/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-charcoal-black mb-2">Skills Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-blue">{skills.filter(s => s.source === 'professional').length}</div>
                  <div className="text-sm text-gray-600">Professional</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-blue">{skills.filter(s => s.source === 'academic').length}</div>
                  <div className="text-sm text-gray-600">Academic</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-blue">{skills.filter(s => s.source === 'inProgress').length}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-blue">{Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)}%</div>
                  <div className="text-sm text-gray-600">Avg. Proficiency</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnhancedSkillsSection;