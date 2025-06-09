export interface Skill {
  name: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  year: string;
  id?: string;
}

export interface SkillsData {
  categories: SkillCategory[];
  certifications: Certification[];
}

export const skillsData: SkillsData = {
  categories: [
    {
      name: 'Languages',
      skills: [
        { name: 'C' },
        { name: 'C++' },
        { name: 'C#' },
        { name: 'Python' },
        { name: 'Java' },
        { name: 'HTML/CSS' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
        { name: 'SQL' },
      ],
    },
    {
      name: 'Frameworks & Libraries',
      skills: [
        { name: 'ReactJS' },
        { name: 'NextJS' },
        { name: 'React Native' },
        { name: 'MERN Stack' },
        { name: 'Tensorflow' },
        { name: 'Selenium' },
        { name: 'Unity' },
      ],
    },
    {
      name: 'Databases',
      skills: [{ name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'MongoDB' }, { name: 'Firebase' }],
    },
    {
      name: 'Cloud & DevOps',
      skills: [
        { name: 'AWS' },
        { name: 'Docker' },
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'Jenkins' },
        { name: 'Linux' },
        { name: 'JIRA' },
        { name: 'Confluence' },
      ],
    },
    {
      name: 'Tools & Technologies',
      skills: [{ name: 'VS Code' }, { name: 'CUDA' }, { name: 'Adobe Photoshop' }],
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Cloud Practitioner',
      year: 'exp. 2028',
      id: 'b192c27f01794e12b1139a82888e103e',
    },
    {
      name: 'Deep Learning Specialization, Coursera',
      year: '',
      id: 'ENZ8QP4842ZR',
    },
  ],
};
