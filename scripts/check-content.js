import process from 'node:process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { site } from '../src/data/site.js'
import { projects } from '../src/data/projects.js'
import { journey } from '../src/data/journey.js'

const errors = []
const warnings = []
const isUrl = (v) => /^https?:\/\/\S+$/.test(v)

for (const [name, url] of Object.entries({ github: site.links.github, linkedin: site.links.linkedin })) {
  if (!url) warnings.push(`Lien ${name} vide : non affiché.`)
  else if (!isUrl(url)) errors.push(`Lien ${name} invalide : ${url}`)
}

if (!site.links.email) warnings.push('E-mail vide : le bouton de contact est masqué.')
else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.links.email)) errors.push(`E-mail invalide : ${site.links.email}`)

if (!site.cvUrl) warnings.push('cvUrl vide : le bouton CV est masqué.')
else if (!existsSync(`public${site.cvUrl}`)) errors.push(`CV introuvable : public${site.cvUrl}`)

if (!site.availability.enabled) warnings.push('Disponibilité désactivée : mention masquée.')
if (!site.about.facts.find((f) => f.label === 'Localisation')?.value) warnings.push('Localisation vide : ligne masquée.')

const imgDir = 'src/assets/projects'
const images = existsSync(imgDir) ? readdirSync(imgDir) : []
for (const f of images) {
  if (/\.(webp|avif|png|jpe?g)\.(webp|avif|png|jpe?g)$/i.test(f)) warnings.push(`Image « ${f} » : double extension, à renommer.`)
}

for (const p of projects) {
  if (!p.status) warnings.push(`${p.name} : statut absent (masqué en production).`)
  if (p.tech.length === 0) warnings.push(`${p.name} : technologies absentes (masquées en production).`)
  if (!images.some((f) => f.startsWith(`${p.id}-cover.`))) warnings.push(`${p.name} : pas de capture ${p.id}-cover.*, fond par défaut utilisé.`)
  for (const key of ['demo', 'github']) {
    if (p[key] && !isUrl(p[key])) errors.push(`${p.name} : lien ${key} invalide (${p[key]})`)
  }
}

for (const step of journey) {
  if (!step.date) warnings.push(`Parcours « ${step.title} » : date absente (masquée en production).`)
}

if (/REMPLACER/.test(readFileSync('index.html', 'utf8'))) errors.push('index.html contient encore un texte « REMPLACER ».')

warnings.forEach((w) => console.log(`[avertissement] ${w}`))
errors.forEach((e) => console.log(`[erreur] ${e}`))
console.log(`\n${errors.length} erreur(s), ${warnings.length} avertissement(s).`)
process.exit(errors.length ? 1 : 0)