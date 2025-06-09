export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export const experiences: Experience[] = [
  {
    position: 'Graduate Research Assistant',
    company: 'Center for Assistive, Rehabilitation & Robotics Technologies (CARRT)',
    period: 'March 2024 – May 2025',
    description: [
      'Collaborated on the development of a VR application (VR4VR) in Unity for vocational rehabilitation of individuals with cognitive disabilities, integrated with a web portal.',
      'Introduced JIRA for agile project tracking and configured a Jenkins CI/CD pipeline to automate Android builds.',
      'Revitalized the existing VR4VR stationary system (IR trackers, 180° projection screen) through software upgrades, enhancing stability and achieving a 25% performance improvement.',
      'Procured and set up NAS storage to streamline local file management and backup workflows in the lab.',
    ],
    skills: ['Unity', 'AR/VR', 'JIRA', 'Jenkins', 'Docker', 'CI/CD', 'NextJS'],
  },
  {
    position: 'Software Engineer',
    company: 'Sony India Software Centre',
    period: 'September 2021 – June 2023',
    description: [
      "Developed AR applications (Android/iOS/Nreal) using Unity, creating PoCs for Sony's AR product pipeline.",
      'Implemented unit testing with Unity Test Framework, improving code reliability and reducing bugs by 90%.',
      'Automated backend deployments with CI/CD pipelines using Jenkins and GitHub Actions, reducing delivery time by 50%.',
      'Developed an SQA application in Unity to test WebAR SDK APIs and resolved a critical crash bug.',
      'Contributed to a microservices-based web portal enabling remote execution of ML models on IMX-500 sensors.',
      'Built a web application that generates textured 3D meshes from mobile camera scans, earning runner-up in an innovation challenge.',
    ],

    skills: ['Unity', 'AR/VR', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Python', 'FastAPI', 'React', 'Vue.js'],
  },
  {
    position: 'Software Engineer Intern',
    company: 'Avysh',
    period: 'January 2020 – August 2020',
    description: [
      'Developed a full-stack e-commerce platform featuring a dynamic rating-and-review system with real-time updates and deployed on Heroku.',
      'Collaborated with a 3-member team and awarded "Best Project" among 8 intern teams for innovation and execution.',
    ],
    skills: ['Node.js', 'MongoDB', 'Handlebars', 'Heroku', 'JavaScript'],
  },
];
