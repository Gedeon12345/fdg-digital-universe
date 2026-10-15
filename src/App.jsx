import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Journey from './sections/Journey'
import Contact from './sections/Contact'

export default function App() {
  return (
    <>
      <a
        href="#accueil"
        className="sr-only z-50 rounded-md bg-orange px-4 py-2 font-medium text-on-orange focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}