const files = import.meta.glob('../assets/projects/*.{webp,avif,png,jpg,jpeg}', {
    eager: true,
    import: 'default',
  })
  const entries = Object.entries(files).map(([path, url]) => ({ name: path.split('/').pop(), url }))
  
  export const getProjectImage = (id) => entries.find((e) => e.name.startsWith(`${id}-cover.`))?.url ?? null
  
  export const getProjectGallery = (id) =>
    entries
      .filter((e) => e.name.startsWith(`${id}-`) && !e.name.startsWith(`${id}-cover.`))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((e) => e.url)