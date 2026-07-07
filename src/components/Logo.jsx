import './Logo.css'

// Rendered inline (not via <img>) so the wordmark uses the page's loaded
// Montserrat — an <img>-loaded SVG is sandboxed and cannot see webfonts, so it
// would fall back to a system sans-serif. Colors come from --vfo-* tokens, so
// the single mark adapts to light/dark automatically (primary ↔ reversed).
export default function Logo() {
  return (
    <svg
      className="logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 670 150"
      role="img"
      aria-label="VFO Simulations"
    >
      <title>VFO Simulations</title>
      <g transform="translate(34,28)">
        <polygon className="logo__bar" points="9.46,0 20.46,0 1.54,52 -9.46,52" />
        <polygon className="logo__bar" points="26.46,0 37.46,0 18.54,52 7.54,52" />
        <polygon className="logo__bar" points="43.46,0 54.46,0 35.54,52 24.54,52" />
        <polygon className="logo__bar-accent" points="60.46,0 71.46,0 52.54,52 41.54,52" />
        <text className="logo__word" x="80" y="46" fontSize="64" letterSpacing="-0.5">
          <tspan fontWeight="800">VFO</tspan>
          <tspan fontWeight="500">Simulations</tspan>
        </text>
        <text className="logo__sub" x="80" y="80" fontSize="21" fontWeight="600" letterSpacing="2">
          VIRTUAL FIRST OFFICER
        </text>
        <rect className="logo__rule" x="402" y="65.5" width="199" height="2" />
      </g>
    </svg>
  )
}
