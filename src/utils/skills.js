// Global skills list that can be used across the application
// Manual skill categories and skills
export const skillCategories = [
  'App Development',
  'Network',
  'Cloud',
  'DevOps',
  'Web Development',
  'Frontend Development',
  'Backend Development',
  'Database Management',
  'Data science',
  'Data analysis',
  'Operating Systems',
  'Cybersecurity',
  'Machine Learning / AI',
  'Git',
  'UI/ UX',
  'AI agent',
  'Electrical & Electronics Engineering',
  'Power Systems',
  'Electrical Machines',
  'Control Systems',
  'Power Electronics',
  'Circuit Analysis',
  'Renewable Energy',
  'Smart Grids',
  'Embedded Systems',
  'High Voltage Engineering',
  'Electrical Drives',
  'Electronics & Communication Engineering',
  'Digital Electronics',
  'Analog Electronics',
  'VLSI Design',
  'Microprocessors & Microcontrollers',
  'Communication Systems',
  'Signal Processing',
  'IoT (Internet of Things)',
  'Wireless Networks',
  'Robotics & Automation',
  'Civil Engineering',
  'Structural Engineering',
  'Geotechnical Engineering',
  'Transportation Engineering',
  'Environmental Engineering',
  'Construction Management',
  'Water Resources Engineering',
  'Surveying & GIS',
  'Urban Planning',
  'Hydraulics',
  'Project Management',
  'Thermodynamics',
  'Fluid Mechanics',
  'Manufacturing & Production',
  'CAD / CAM / CAE',
  'Machine Design',
  'Materials Science',
  'Automotive Engineering',
  'HVAC Systems',
  'Maintenance Engineering',
  'Arts',
  'Painting & Drawing',
  'Sculpture',
  'Performing Arts',
  'Photography',
  'Graphic Design',
  'Film & Media Studies',
  'Theatre & Drama',
  'Literature & Creative Writing',
  'Art History',
  'Visual Communication',
  'Music',
  'Content Writing',
  'Instrumental Performance',
  'Music Composition',
  'Sound Engineering',
  'Music Production',
  'Digital Music & DAWs',
  'Video Editing'
];

// Simplified categories for filtering (maps to broader skill groups)
// Manual skill entry: skills are the same as categories for now
export const predefinedSkills = [...skillCategories];

// Function to get skills by category for filtering
// Manual skill entry: each category is a skill, so return as array
export const getSkillsByCategory = (category) => {
  if (skillCategories.includes(category)) {
    return [category];
  }
  return [];
};
