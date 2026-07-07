import './Header.css'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggle }) {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo theme={theme} />
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </header>
  )
}
