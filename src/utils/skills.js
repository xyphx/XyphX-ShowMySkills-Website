// Global skills list that can be used across the application
export const predefinedSkills = [
  // Programming Languages
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R',
  
  // Web Development
  'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Next.js', 'Nuxt.js', 'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS',
  
  // Mobile Development
  'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 'Ionic',
  
  // Backend & Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API',
  
  // Data Science & AI
  'Machine Learning', 'Deep Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn',
  
  // Blockchain & Web3
  'Blockchain', 'Ethereum', 'Smart Contracts', 'Solidity', 'Web3', 'DeFi', 'NFT',
  
  // Cybersecurity
  'Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'Network Security', 'Cryptography',
  
  // DevOps & Cloud
  'DevOps', 'CI/CD', 'Jenkins', 'GitHub Actions', 'AWS', 'Azure', 'Google Cloud', 'Terraform',
  
  // Design & UI/UX
  'UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Graphic Design', 'Web Design',
  
  // Other Technologies
  'Git', 'Linux', 'Microservices', 'Agile', 'Scrum', 'Project Management', 'Technical Writing'
].sort();

// Simplified categories for filtering (maps to broader skill groups)
export const skillCategories = [
  'Web Development',
  'Mobile Development', 
  'Data Science',
  'AI/ML',
  'BlockChain',
  'Cybersecurity',
  'DevOps',
  'UI/UX Design'
];

// Function to get skills by category for filtering
export const getSkillsByCategory = (category) => {
  const categoryMappings = {
    'Web Development': ['JavaScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Next.js', 'Nuxt.js', 'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS', 'TypeScript', 'PHP'],
    'Mobile Development': ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Xamarin', 'Ionic', 'Swift', 'Kotlin', 'Dart'],
    'Data Science': ['Data Science', 'Python', 'R', 'Pandas', 'NumPy', 'Scikit-learn'],
    'AI/ML': ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Python'],
    'BlockChain': ['Blockchain', 'Ethereum', 'Smart Contracts', 'Solidity', 'Web3', 'DeFi', 'NFT'],
    'Cybersecurity': ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'Network Security', 'Cryptography'],
    'DevOps': ['DevOps', 'CI/CD', 'Jenkins', 'GitHub Actions', 'AWS', 'Azure', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes'],
    'UI/UX Design': ['UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Graphic Design', 'Web Design']
  };
  
  return categoryMappings[category] || [];
};
