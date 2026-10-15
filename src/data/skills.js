import { Code, Smartphone, Server, Database, Palette, Wrench } from 'lucide-react'

// À AJUSTER selon les technologies réellement maîtrisées.
export const skillCategories = [
  { id: 'frontend', title: 'Frontend Web', icon: Code, items: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] },
  { id: 'mobile', title: 'Développement mobile', icon: Smartphone, items: ['React Native', 'Expo'] },
  { id: 'backend', title: 'Backend', icon: Server, items: ['Node.js', 'Express.js', 'API REST'] },
  { id: 'database', title: 'Bases de données', icon: Database, items: ['MongoDB'] },
  { id: 'ui', title: 'UI et animations', icon: Palette, items: ['Motion (Framer Motion)', 'Responsive design', 'Conception d’interfaces'] },
  { id: 'tools', title: 'Outils et déploiement', icon: Wrench, items: ['Git', 'GitHub', 'Vercel', 'Render'] },
]