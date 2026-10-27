import './App.css'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Privacy from './components/Privacy'
import FlightVector from './components/FlightVector'
import { useTheme } from './hooks/useTheme'

const ROUTES = { '#privacy': 'privacy', '#flightvector': 'flightvector' }

function currentRoute() {
  return ROUTES[window.location.hash] ?? 'home'
}

function App() {
  const { theme, toggle } = useTheme()
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHashChange = () => {
      setRoute(currentRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div className="app">
      <Header theme={theme} onToggle={toggle} />
      <main className="app__main">
        {route === 'privacy' ? <Privacy /> : route === 'flightvector' ? <FlightVector /> : <Home />}
      </main>
      <Footer />
    </div>
  )
}

export default App
