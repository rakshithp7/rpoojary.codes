export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email?: string;
  location?: string;
  phone?: string;
  socialLinks: {
    linkedin: SocialLink;
    github: SocialLink;
    email: SocialLink;
  };
  status: {
    available: boolean;
    message: string;
    details: string;
  };
}

export const contactData: ContactInfo = {
  //   email: 'rakshithp7@gmail.com',
  location: 'Tampa, FL',
  //   phone: '+1 (656) 574-0676',
  socialLinks: {
    linkedin: {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/rpoojary7',
      icon: 'Linkedin',
    },
    github: {
      platform: 'GitHub',
      url: 'https://github.com/rakshithp7',
      icon: 'Github',
    },
    email: {
      platform: 'Send Email',
      url: 'mailto:rakshithp7@gmail.com',
      icon: 'Mail',
    },
  },
  status: {
    available: true,
    message: 'Available for new opportunities',
    details: 'Currently looking for full-time positions in software development roles.',
  },
};
