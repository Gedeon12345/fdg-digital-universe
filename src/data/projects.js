// Informations fournies par Gédéon. status: null ou tech: [] = à confirmer
// (masqué en production, repère rouge en développement).
export const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'community', label: 'Communauté' },
  ]
  
  export const projects = [
    {
      id: 'locacam',
      name: 'LOCACAM',
      category: 'mobile',
      kind: 'Application mobile immobilière',
      status: 'En développement — V1 en cours',
      summary:
        'Application mobile de location immobilière en cours de développement, qui vise à faciliter la recherche de logements et les échanges entre locataires et propriétaires.',
      tech: ['React Native', 'Expo', 'Node.js', 'Express.js', 'MongoDB'],
      demo: null,
      github: null,
      detail: {
        overview:
          'LOCACAM est une application mobile de location immobilière en cours de développement avec React Native, Expo, Node.js, Express.js et MongoDB. Elle vise à permettre la recherche de logements, la publication d’annonces par les propriétaires, la vérification des propriétaires et les échanges entre locataires et propriétaires.',
        plannedFeatures: [
          'Recherche de logements',
          'Publication d’annonces par les propriétaires',
          'Vérification des propriétaires',
          'Échanges entre locataires et propriétaires',
        ],
        currentState: 'Version 1 en cours de développement. Aucune démonstration publique n’est disponible pour le moment.',
        // À FOURNIR : problem, goal, role, choices, challenges
      },
    },
    {
      id: 'jobportal',
      name: 'JobPortal',
      category: 'web',
      kind: 'Application web de recrutement',
      status: 'En amélioration',
      summary:
        'Application web de recrutement développée avec l’écosystème MERN, avec notamment la gestion des offres et des statuts des recruteurs.',
      tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      demo: 'https://jobportal-frontend-sable.vercel.app/',
      github: 'https://github.com/Gedeon12345/jobportal-frontend',
      detail: null,
    },
    {
      id: 'students-glory',
      name: 'Student’s Glory',
      category: 'community',
      kind: 'Plateforme communautaire',
      status: 'En amélioration',
      summary:
        'Plateforme web qui accompagne les étudiants dans leur parcours académique et professionnel, avec une identité chrétienne.',
        tech: ['TypeScript', 'Expo', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      demo: 'https://students-glory.vercel.app/',
      github: 'https://github.com/Gedeon12345/students-glory-hub',
      detail: null,
    },
    {
      id: 'mda-gallery',
      name: 'MDA Gallery',
      category: 'ecommerce',
      kind: 'E-commerce',
      status: 'Projet de formation',
      summary:
        'Projet e-commerce réalisé pendant ma formation en informatique, consacré à la vente de produits Birkenstock et de matériel informatique.',
      tech: ['TypeScript', 'Expo', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      demo: 'https://mda-sigma.vercel.app/', // À VÉRIFIER : 404 constaté
      github: 'https://github.com/Gedeon12345/mdagalleryweb',
      detail: null,
    },
  ]