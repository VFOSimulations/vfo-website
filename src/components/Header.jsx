import './Header.css'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

export default function Header({ theme, onToggle }) {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__home" href="#" aria-label="VFO Simulations — home">
          <Logo />
        </a>
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </header>
  )
}
