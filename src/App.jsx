import './App.css'
import Header from './components/Header'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="app">
      <Header theme={theme} onToggle={toggle} />
      <main className="app__main" aria-label="Main content">
        {/* No content yet — header-only shell. */}
      </main>
    </div>
  )
}

export default App
