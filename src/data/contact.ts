export interface ContactItem {
  label: string;
  value: string;
  type?: 'basic' | 'status' | 'social';
  available?: boolean; // for status items
}

export const contactData: ContactItem[] = [
  // Basic info
  // { label: 'Email', value: 'rakshithp7@gmail.com', type: 'basic' },
  { label: 'Location', value: 'Tampa, FL', type: 'basic' },
  // { label: 'Phone', value: '+1 (656) 574-0676', type: 'basic' },

  // Social links
  { label: 'LinkedIn', value: 'https://linkedin.com/in/rpoojary7', type: 'social' },
  { label: 'GitHub', value: 'https://github.com/rakshithp7', type: 'social' },
  { label: 'Email', value: 'mailto:rakshithp7@gmail.com', type: 'social' },

  // Status
  { label: 'Status', value: 'Available for new opportunities', type: 'status', available: true },
  {
    label: 'Details',
    value: 'Currently looking for full-time positions in software development roles.',
    type: 'status',
  },
];
