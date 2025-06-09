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
        <Dock direction="middle" className="bg-custom-brown dark:bg-white/10 space-x-2 px-4 shadow-md border-black/10">
          {socialLinks.map((social) => (
            <DockIcon key={social.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    aria-label={social.name}
                    className="flex h-full w-full items-center justify-center rounded-full transition-all hover:bg-white/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}>
                    <social.icon className="h-5 w-5" />
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
