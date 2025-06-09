export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  gpa?: string;
  relevantCourses?: string[];
}

export const educationData: Education[] = [
  {
    degree: 'Master of Science in Computer Science',
    institution: 'University of South Florida',
    period: 'Aug 2023 - May 2025',
    // description:
    //   'Graduated with a focus on software engineering and web development. Completed senior project on machine learning applications in web development.',
    gpa: '3.86/4.0',
    // relevantCourses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems'],
  },
  {
    degree: 'Bachelor of Engineering in Computer Science & Engineering',
    institution: 'NMAM Institute of Technology',
    period: 'Aug 2017 - May 2021',
    // description:
    //   'Graduated with a focus on software engineering and web development. Completed senior project on machine learning applications in web development.',
    gpa: '3.73/4.0',
    // relevantCourses: ['Data Structures', 'Algorithms', 'Web Development', 'Database Systems'],
  },
];
