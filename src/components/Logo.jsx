import './Logo.css'
import primaryLogo from '../assets/vfo-logo-primary.svg'
import reversedLogo from '../assets/vfo-logo-reversed.svg'

export default function Logo({ theme }) {
  const src = theme === 'dark' ? reversedLogo : primaryLogo
  return <img className="logo" src={src} alt="VFO Simulations" />
}
