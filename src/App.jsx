import './App.css'
import Header from './components/Header'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="app">
      <Header theme={theme} onToggle={toggle} />
      <section className="banner">
        <div className="banner__inner">
          <h1 className="tagline">
            CRM for Sim Captains
          </h1>
        </div>
      </section>
      <main className="app__main" />
    </div>
  )
}

export default App
