'use client';

import { Dock, DockIcon } from '@/components/magicui/dock';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SocialDockProps {
  className?: string;
}

export function SocialDock({ className }: SocialDockProps) {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/rakshithp7',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/rpoojary7',
      icon: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto:rakshithp7@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <div className={cn('flex flex-col items-center justify-center', className)} tabIndex={-1}>
      <TooltipProvider>
        <Dock
          direction="middle"
          className={cn('space-x-2 px-4 shadow-md backdrop-blur-sm', 'bg-secondary border dark:bg-secondary/30')}>
          {socialLinks.map((social) => (
            <DockIcon key={social.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      'flex h-full w-full items-center justify-center rounded-full transition-all',
                      'text-muted-foreground hover:bg-primary/20 hover:text-primary-foreground focus-visible:outline-hidden',
                      'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}>
                    <social.icon className="h-5 w-5 transition-colors" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        </Dock>
      </TooltipProvider>
    </div>
  );
}
