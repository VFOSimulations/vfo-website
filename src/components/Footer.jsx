import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__copy">© 2026 VFO Simulations</span>
        <nav className="footer__nav" aria-label="Footer">
          <a href="#">Home</a>
          <a href="#privacy">Privacy</a>
        </nav>
      </div>
    </footer>
  )
}
