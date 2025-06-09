import { Folder, User, Briefcase, GraduationCap, Code, Lightbulb, Mail, File } from 'lucide-react';

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon?: React.ComponentType<{ className?: string }>;
  children?: FileNode[];
  content?: string;
}

export const directoryStructure: FileNode = {
  id: 'root',
  name: '/',
  type: 'folder',
  icon: Folder,
  children: [
    {
      id: 'about',
      name: 'about',
      type: 'folder',
      icon: User,
      children: [
        {
          id: 'about-intro',
          name: 'introduction.md',
          type: 'file',
          icon: File,
          content: 'about',
        },
      ],
    },
    {
      id: 'experience',
      name: 'experience',
      type: 'folder',
      icon: Briefcase,
      children: [
        {
          id: 'experience-work',
          name: 'work-history.md',
          type: 'file',
          icon: File,
          content: 'experience',
        },
      ],
    },
    {
      id: 'education',
      name: 'education',
      type: 'folder',
      icon: GraduationCap,
      children: [
        {
          id: 'education-formal',
          name: 'degrees.md',
          type: 'file',
          icon: File,
          content: 'education',
        },
      ],
    },
    {
      id: 'skills',
      name: 'skills',
      type: 'folder',
      icon: Code,
      children: [
        {
          id: 'skills-technical',
          name: 'technical-skills.md',
          type: 'file',
          icon: File,
          content: 'skills',
        },
      ],
    },
    {
      id: 'projects',
      name: 'projects',
      type: 'folder',
      icon: Lightbulb,
      children: [
        {
          id: 'featured-projects',
          name: 'featured-projects.md',
          type: 'file',
          icon: File,
          content: 'featured-projects',
        },
        {
          id: 'personal-projects',
          name: 'personal-projects.md',
          type: 'file',
          icon: File,
          content: 'personal-projects',
        },
      ],
    },
    {
      id: 'contact',
      name: 'contact',
      type: 'file',
      icon: Mail,
      content: 'contact',
    },
  ],
};
