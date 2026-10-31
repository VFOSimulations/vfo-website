import './Footer.css'

// The VFO-wide non-affiliation notice (user wording, 2026-10-31). The
// FlightVector app's Settings page and its installer carry the same sentence
// (vfo-flightvector: ui/src/legal.ts); change them together.
const NOT_AFFILIATED =
  'VFO products are independent. They are not affiliated with, endorsed by, or sponsored by Microsoft, ' +
  'Asobo Studio, or any aircraft, add-on or hardware developer or manufacturer. Product, aircraft and ' +
  'hardware names are trademarks of their owners and are used only to identify compatible products.'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__copy">© 2026 VFO Simulations</span>
        <nav className="footer__nav" aria-label="Footer">
          <a href="#">Home</a>
          <a href="#privacy">Privacy</a>
        </nav>
        <p className="footer__legal">{NOT_AFFILIATED}</p>
      </div>
    </footer>
  )
}
