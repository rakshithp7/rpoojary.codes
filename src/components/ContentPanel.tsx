import React from 'react';
import { FileNode } from '@/data/directoryStructure';
import { Code, Briefcase, GraduationCap, Lightbulb, Mail, User, ExternalLink, Github, Linkedin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { experiences } from '@/data/experience';
import { educationData } from '@/data/education';
import { skillsData } from '@/data/skills';
import { featuredProjects, portfolioProjects } from '@/data/projects';
import { contactData, ContactItem } from '@/data/contact';

interface ContentPanelProps {
  selectedNode: FileNode | null;
}

// Helper functions to extract contact information from the array
const getContactItem = (label: string): ContactItem | undefined => {
  return contactData.find((contact) => contact.label === label);
};

const getBasicInfo = () => contactData.filter((item) => item.type === 'basic');
const getSocialLinks = () => contactData.filter((item) => item.type === 'social');

const ContentSection: React.FC<{
  children: React.ReactNode;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}> = ({ children, title, icon: Icon }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <Icon className="w-6 h-6 transition-colors duration-300 text-primary" />
      <h1 className="text-lg md:text-3xl font-bold transition-colors duration-300 text-foreground">{title}</h1>
    </div>
    {children}
  </div>
);

const getContentForSection = (contentType: string) => {
  const cardClass =
    'p-6 backdrop-blur-xs border transition-colors duration-300 bg-card/80 border-border/60 dark:bg-card/15 dark:border-border/30';
  const textPrimaryClass = 'transition-colors duration-300 text-foreground';
  const textSecondaryClass = 'transition-colors duration-300 text-muted-foreground';
  const accentClass = 'transition-colors duration-300 text-primary';
  const badgeClass = 'transition-colors duration-300 bg-primary/15 text-primary hover:bg-primary/25';
  const buttonClass =
    'transition-colors duration-300 border-primary text-primary hover:bg-primary hover:text-primary-foreground';

  switch (contentType) {
    case 'about':
      return (
        <ContentSection title="About Me" icon={User}>
          <Card className={cardClass}>
            <div className="space-y-4">
              <p className={cn('text-lg leading-relaxed', textPrimaryClass)}>
                Hello! I'm a passionate developer with a love for creating beautiful, functional applications. I enjoy
                working with modern technologies and solving complex problems through elegant code.
              </p>
              <p className={cn('leading-relaxed', textSecondaryClass)}>
                When I'm not coding, you can find me exploring new technologies, or enjoying the great outdoors.{' '}
                <span className="text-[6px]">I like indoor activities too</span>
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                <Badge variant="secondary" className={badgeClass}>
                  Problem Solver
                </Badge>
                <Badge variant="secondary" className={badgeClass}>
                  Team Player
                </Badge>
                <Badge variant="secondary" className={badgeClass}>
                  Continuous Learner
                </Badge>
              </div>
            </div>
          </Card>
        </ContentSection>
      );

    case 'experience':
      return (
        <ContentSection title="Work Experience" icon={Briefcase}>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className={cardClass}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={cn('text-lg md:text-xl font-semibold', textPrimaryClass)}>{exp.position}</h3>
                    <p className={cn('font-medium', accentClass)}>{exp.company}</p>
                  </div>
                  <Badge variant="outline" className={cn('border-current', accentClass)}>
                    {exp.period}
                  </Badge>
                </div>
                <ul className={cn('mb-4 list-disc pl-5 space-y-1', textSecondaryClass)}>
                  {exp.description.map((desc, index) => (
                    <li key={index} className="marker:text-primary">
                      {desc}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </ContentSection>
      );

    case 'education':
      return (
        <ContentSection title="Education" icon={GraduationCap}>
          <div className="space-y-6">
            {educationData.map((edu, index) => (
              <Card key={index} className={cardClass}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={cn('text-lg md:text-xl font-semibold', textPrimaryClass)}>{edu.degree}</h3>
                    <p className={cn('font-medium', accentClass)}>{edu.institution}</p>
                  </div>
                  <Badge variant="outline" className={cn('border-current', accentClass)}>
                    {edu.period}
                  </Badge>
                </div>
                <p className={cn('mb-4', textSecondaryClass)}>{edu.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {edu.gpa && (
                    <div>
                      <p className={cn('text-sm font-medium', textPrimaryClass)}>GPA</p>
                      <p className={textSecondaryClass}>{edu.gpa}</p>
                    </div>
                  )}
                  {edu.relevantCourses && (
                    <div>
                      <p className={cn('text-sm font-medium', textPrimaryClass)}>Relevant Coursework</p>
                      <p className={cn('text-sm', textSecondaryClass)}>{edu.relevantCourses.join(', ')}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ContentSection>
      );

    case 'skills':
      return (
        <ContentSection title="Technical Skills" icon={Code}>
          <div className="grid gap-6">
            {skillsData.categories.map((category, index) => (
              <Card key={index} className={cardClass}>
                <h3 className={cn('text-lg font-semibold mb-4', textPrimaryClass)}>{category.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className={cn('justify-center py-2', badgeClass)}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}

            <Card className={cardClass}>
              <h3 className={cn('text-lg font-semibold mb-4', textPrimaryClass)}>Certifications</h3>
              <div className="space-y-4">
                {skillsData.certifications.map((cert, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={cn('font-medium', textPrimaryClass)}>{cert.name}</span>
                      {cert.year && <Badge variant="secondary">{cert.year}</Badge>}
                    </div>
                    {cert.id && <p className={cn('text-xs', textSecondaryClass)}>ID: {cert.id}</p>}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ContentSection>
      );

    case 'featured-projects':
      return (
        <ContentSection title="Featured Projects" icon={Lightbulb}>
          <div className="space-y-6">
            {featuredProjects.map((project, index) => (
              <Card key={index} className={cardClass}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={cn('text-lg md:text-xl font-semibold', textPrimaryClass)}>{project.title}</h3>
                    <p className={textSecondaryClass}>{project.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    {project.codeUrl && (
                      <Button size="sm" variant="outline" className={buttonClass}>
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" variant="outline" className={buttonClass}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live
                      </Button>
                    )}
                  </div>
                </div>
                <p className={cn('mb-4', textSecondaryClass)}>{project.description}</p>
                <div className="mb-4">
                  <h4 className={cn('text-sm font-semibold mb-2', textPrimaryClass)}>Key Achievements:</h4>
                  <ul className={cn('list-disc pl-5 space-y-1', textSecondaryClass)}>
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="marker:text-primary">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </ContentSection>
      );

    case 'personal-projects':
      return (
        <ContentSection title="Personal Projects" icon={Lightbulb}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioProjects.map((project, index) => (
              <Card key={index} className={cn(cardClass, 'p-0 overflow-hidden')}>
                <div className="flex flex-col h-full">
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className={cn('text-lg md:text-xl font-semibold', textPrimaryClass)}>{project.title}</h3>
                    </div>
                    <p className={cn('mb-4 grow', textSecondaryClass)}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.categories.split(', ').map((category, catIndex) => (
                        <Badge key={catIndex} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className={buttonClass}>
                            <Github className="w-4 h-4 mr-1" />
                            GitHub
                          </Button>
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="outline" className={buttonClass}>
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ContentSection>
      );

    case 'contact':
      return (
        <ContentSection title="Get In Touch" icon={Mail}>
          <div className="space-y-6">
            <Card className={cardClass}>
              <p className={cn('text-base md:text-lg mb-6', textPrimaryClass)}>
                I'm always interested in new opportunities and collaborations. Feel free to reach out if you'd like to
                discuss a project or just say hello!
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {getBasicInfo().map((item) => (
                    <div key={item.label}>
                      <h4 className={cn('font-semibold mb-2', textPrimaryClass)}>{item.label}</h4>
                      <p className={textSecondaryClass}>{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className={cn('font-semibold mb-4', textPrimaryClass)}>Connect Online</h4>
                  <div className="space-y-3">
                    {getSocialLinks().map((link) => {
                      const getIcon = (label: string) => {
                        switch (label) {
                          case 'LinkedIn':
                            return <Linkedin className="w-4 h-4 mr-2" />;
                          case 'GitHub':
                            return <Github className="w-4 h-4 mr-2" />;
                          case 'Email':
                            return <Mail className="w-4 h-4 mr-2" />;
                          default:
                            return null;
                        }
                      };
                      const getButtonText = (label: string) => {
                        switch (label) {
                          case 'LinkedIn':
                            return 'LinkedIn Profile';
                          case 'GitHub':
                            return 'GitHub Profile';
                          case 'Email':
                            return 'Send Email';
                          default:
                            return label;
                        }
                      };

                      return (
                        <Button
                          key={link.label}
                          variant="outline"
                          className={cn('w-full justify-start', buttonClass)}
                          onClick={() => window.open(link.value, '_blank')}>
                          {getIcon(link.label)}
                          {getButtonText(link.label)}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            <Card className={cardClass}>
              <h3 className={cn('text-lg font-semibold mb-4', textPrimaryClass)}>Current Status</h3>
              {(() => {
                const statusItem = getContactItem('Status');
                const detailsItem = getContactItem('Details');
                return (
                  <>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 ${
                          statusItem?.available ? 'bg-primary' : 'bg-secondary'
                        } rounded-full animate-pulse`}></div>
                      <span className={textSecondaryClass}>{statusItem?.value}</span>
                    </div>
                    {detailsItem && <p className={cn('text-sm mt-2', textSecondaryClass)}>{detailsItem.value}</p>}
                  </>
                );
              })()}
            </Card>
          </div>
        </ContentSection>
      );

    default:
      return (
        <div className="flex relativeitems-center justify-center h-full">
          <div className="text-center h-[20vh] flex flex-col items-center justify-between">
            <h2 className={cn('text-2xl font-semibold mb-2', textPrimaryClass)}>Welcome to My Portfolio</h2>
            <p className={cn(textSecondaryClass, 'text-muted-foreground')}>No file selected.</p>
            <p className={cn(textSecondaryClass, 'text-sm')}>Select a file from the explorer to view content.</p>
          </div>
          <p className={cn(textSecondaryClass, 'absolute bottom-0 left-1/2 -translate-x-1/2 text-xs')}>
            (I like to mess around here once in a while...)
          </p>
        </div>
      );
  }
};

export const ContentPanel: React.FC<ContentPanelProps> = ({ selectedNode }) => {
  return (
    <div
      tabIndex={-1}
      className={cn(
        'h-full backdrop-blur-xs border rounded-b-lg md:rounded-b-none md:rounded-tr-lg p-4 md:p-8 my-1 mx-1 md:mr-1 md:ml-0 overflow-y-auto rounded-t-none transition-colors duration-300',
        'bg-card/20 border-border/20 dark:bg-foreground/10 dark:border-border/30'
      )}>
      <div className="max-w-7xl mx-auto pb-20">{getContentForSection(selectedNode?.content || 'default')}</div>
    </div>
  );
};
