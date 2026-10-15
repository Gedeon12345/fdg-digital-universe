# FDG — Digital Universe

Portfolio personnel de **Gédéon Foba Deffo**, développeur web et mobile : une expérience sombre, immersive et rapide pour présenter son profil, ses compétences, ses projets et son parcours.

## Technologies

- React 19 (JavaScript, JSX) et Vite
- Tailwind CSS v4 (design tokens dans `src/styles/globals.css`)
- Motion pour React (animations, `prefers-reduced-motion` respecté)
- Lucide React (icônes), Fontsource (Space Grotesk, Inter, JetBrains Mono)
- Déploiement : Vercel

Aucun backend : le site est statique.

## Installation

Prérequis : Node.js 20.19 ou supérieur (Node 22 ou 24 LTS recommandé).

```bash
git clone https://github.com/Gedeon12345/fdg-digital-universe.git
cd fdg-digital-universe
npm install
```

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement (http://localhost:5173) |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Prévisualiser le build de production |
| `npm run lint` | Analyse ESLint |
| `npm run check:content` | Vérifie les données avant publication |

## Configuration du contenu

Tout le contenu modifiable est centralisé :

- `src/data/site.js` : identité, liens (GitHub, LinkedIn, e-mail), CV, disponibilité, texte « À propos »
- `src/data/projects.js` : projets, statuts, technologies, liens
- `src/data/skills.js` : compétences
- `src/data/journey.js` : parcours

Règles : un lien vide n'est pas affiché ; un statut ou une liste de technologies vide est masqué en production et signalé en rouge en développement.

### Images des projets

Placer les captures dans `src/assets/projects/` :

- `<id>-cover.webp` : image de la carte (16:9, idéalement 1280×720, moins de 200 kB)
- `<id>-2.webp`, `<id>-3.webp`… : images de la fiche détaillée

`<id>` correspond à l'identifiant du projet dans `projects.js` (par exemple `locacam`).

### CV

Placer le PDF dans `public/` (par exemple `cv-gedeon-foba-deffo.pdf`) et renseigner `cvUrl` dans `src/data/site.js`. Sans `cvUrl`, le bouton de téléchargement n'apparaît pas.

### Contact

Par défaut, le contact se fait par lien `mailto:`. Un formulaire d'envoi réel est disponible : renseigner `contact.formEndpoint` (URL Formspree) dans `src/data/site.js`. Ne jamais placer de clé secrète dans le code ou dans une variable `VITE_*` : ces valeurs sont publiques.

## Déploiement sur Vercel

1. Pousser le dépôt sur GitHub.
2. Sur vercel.com : *Add New… → Project*, importer le dépôt.
3. Paramètres détectés automatiquement : framework **Vite**, commande `npm run build`, dossier de sortie `dist`.
4. Après le premier déploiement, renseigner l'URL publique dans `index.html`, `public/robots.txt` et `public/sitemap.xml`, puis pousser : Vercel redéploie automatiquement.

## Structure

```
src/
  assets/projects/   captures d'écran
  components/        layout, ui, animations
  data/              contenu modifiable
  hooks/  lib/       utilitaires
  sections/          Hero, About, Skills, Projects, Journey, Contact
  styles/            globals.css
```
