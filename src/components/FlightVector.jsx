import './FlightVector.css'

// Placeholder until the Google Form exists.
const APPLY_URL = '#apply'

export default function FlightVector() {
  return (
    <article className="fv">
      <section className="fv__hero">
        <p className="fv__label">VFO FlightVector · for MSFS 2024</p>
        <h1 className="fv__title">Start on final. Already flying.</h1>
        <p className="fv__kicker">No autopilot needed.</p>
        <p className="fv__lede">
          Pick an approach or a fix, and FlightVector places your aircraft there in stable
          flight: on speed, on thrust, trimmed. Let go of the controls. With the autopilot off,
          it keeps flying.
        </p>
        <div className="fv__actions">
          <a className="fv__btn fv__btn--primary" href={APPLY_URL}>Join the beta</a>
          <a className="fv__btn fv__btn--secondary" href="#flightvector-demo">Watch the demo</a>
        </div>
        <p className="fv__own">Works with the aircraft you already own.</p>
      </section>

      <section className="fv__demo" id="flightvector-demo">
        <figure className="fv__figure">
          <div className="fv__video">
            <span className="fv__video-placeholder">
              [DEMO VIDEO — stock aircraft, autopilot off, hands off]
            </span>
            <div className="fv__strip" aria-hidden="true">
              <span className="fv__ann fv__ann--normal">RELEASED</span>
              <span className="fv__ann">AP OFF</span>
              <span className="fv__ann">A/THR OFF</span>
              <span className="fv__ann">HANDS OFF</span>
            </div>
          </div>
          <figcaption className="fv__caption">
            Placed on a 3° final and released with the autopilot off. Nobody touches the
            controls.
          </figcaption>
        </figure>
      </section>

      <section className="fv__band">
        <div className="fv__inner">
          <p className="fv__label">How it works</p>
          <h2 className="fv__h2">Three steps from the menu to the approach.</h2>
          <ol className="fv__steps">
            <li className="fv__step">
              <span className="fv__step-num">01</span>
              <h3 className="fv__h3">Pick where you want to be</h3>
              <p>An approach to any runway, a point on a procedure, or a distance from a fix.</p>
            </li>
            <li className="fv__step">
              <span className="fv__step-num">02</span>
              <h3 className="fv__h3">Set the details</h3>
              <p>Distance, altitude, flaps and gear, and what the automation does when you take over.</p>
            </li>
            <li className="fv__step">
              <span className="fv__step-num">03</span>
              <h3 className="fv__h3">Place</h3>
              <p>
                Your aircraft appears there trimmed and stable. Fly it by hand from the first
                second, or hand it to the autothrust and autopilot if you prefer.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="fv__dev">
        <div className="fv__card">
          <p className="fv__label">For aircraft developers</p>
          <p>
            Want your aircraft supported? Write to <a href="mailto:rori@vfosim.com">rori@vfosim.com</a>.
          </p>
        </div>
      </section>

      <section className="fv__apply" id="apply">
        <div className="fv__inner fv__apply-inner">
          <div>
            <p className="fv__label fv__label--on-dark">Beta</p>
            <h2 className="fv__h2">Fly it before launch.</h2>
            <p className="fv__apply-text">
              We're picking a small group of MSFS 2024 pilots for the first beta. Sign up and we'll be in touch.
            </p>
          </div>
          <a className="fv__btn fv__btn--inverse" href={APPLY_URL}>Sign up for the beta →</a>
        </div>
      </section>

      <p className="fv__note">FlightVector runs on MSFS 2024 for Windows.</p>
    </article>
  )
}
