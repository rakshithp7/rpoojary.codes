export interface Technology {
  name: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  achievements: string[];
  technologies: string[];
  codeUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface PortfolioProject {
  title: string;
  image: string;
  tech: string;
  description: string;
  categories: string;
  demo: string | null;
  github: string | null;
}

export const featuredProjects: Project[] = [
  {
    title: 'Virtual Reality for Vocational Rehabilitation (VR4VR)',
    subtitle: 'VR Application for Skill Development',
    description:
      'A comprehensive VR application designed to facilitate vocational skill development for individuals with cognitive impairments, featuring real-time progress tracking and job coach integration.',
    achievements: [
      'Developed VR application using Meta XR SDK for cognitive skill development',
      'Implemented real-time data synchronization between Unity client and Next.js/Go portal',
      'Established Jenkins CI/CD pipeline reducing iteration time by 35%',
      'Created auxiliary VR research application for headset comfort evaluation',
    ],
    technologies: ['Unity', 'C#', 'NextJS', 'Go', 'Jenkins', 'Meta XR SDK', 'WebSocket', 'RESTful APIs'],
  },
  {
    title: 'AI-based Clinical Decision Support System (CDSS)',
    subtitle: 'Medical Diagnosis Assistant',
    description:
      'An end-to-end AI-driven system integrating CNN and DNN pipelines to assist medical practitioners in diagnosing patients using multi-modal inputs from chest X-rays.',
    achievements: [
      'Achieved 89.20% image classification accuracy with MobileNet',
      'Implemented 87.24% text classification accuracy using DNN',
      'Developed interactive web tool for medical diagnosis assistance',
      'Integrated multi-modal inputs for comprehensive patient assessment',
    ],
    technologies: ['Python', 'Flask', 'HTML/CSS', 'Bootstrap', 'TensorFlow', 'CNN', 'DNN', 'MobileNet'],
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'Amazon Clone',
    image: '/images/projects/amazon-clone.png',
    tech: 'ReactJS',
    description: 'Amazon Clone (look-alike) built with ReactJS',
    categories: 'ReactJS, Firebase',
    demo: 'https://clone-509fd.web.app/',
    github: null,
  },
  {
    title: 'Covid-19 Tracker',
    image: '/images/projects/covid19-tracker.png',
    tech: 'ReactJS',
    description: 'Covid-19 tracker made in React with the help of disease.sh API.',
    categories: 'ReactJS',
    demo: 'https://rakshithp7.github.io/react-covid-tracker/',
    github: null,
  },
  {
    title: 'WhatsApp Web Clone',
    image: '/images/projects/whatsapp-web-clone.png',
    tech: 'ReactJS',
    description: 'WhatsApp web clone (look-alike) using ReactJS.',
    categories: 'ReactJS, Firebase',
    demo: 'https://whatsapp-clone-raks.web.app/',
    github: null,
  },
  {
    title: 'Spotify Clone',
    image: '/images/projects/spotify-clone.png',
    tech: 'ReactJS',
    description: 'A clone of Spotify web player using ReactJS.',
    categories: 'ReactJS, Spotify API',
    demo: 'https://rakshithp7.github.io/react-spotify-clone/',
    github: null,
  },
  {
    title: 'React Native Instagram Clone',
    image: '/images/projects/insta-clone1.png',
    tech: 'React Native',
    description: 'Instagram clone using React Native and expo.',
    categories: 'React Native, AWS amplify',
    demo: null,
    github: 'https://github.com/rakshithp7/reactnative-instagram-clone',
  },
  {
    title: 'React Deepface Song Suggestion',
    image: '/images/projects/deepface.png',
    tech: 'ReactJS',
    description: 'Under Development. React web app to analyze face expression and suggest music based on emotion/mood.',
    categories: 'ReactJS, DeepFace API, Spotify API',
    demo: null,
    github: 'https://github.com/rakshithp7/deepface-react',
  },
];
