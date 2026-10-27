import './FlightVector.css'
import { useState } from 'react'

const DEMO_VIDEO_ID = 'aD9ndyLcFzg'
const DEMO_TITLE = 'FlightVector landing practice: FlyByWire A32NX at St. Maarten'

const BETA_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeDZqGj_biXOEC9y5SbR8xHUNfuq678xnsNwq9768SeONPeDA/viewform'

// The site routes by hash, so an in-page "#id" link would leave this page.
// Scroll to the video instead and keep the route.
function scrollToDemo(e) {
  e.preventDefault()
  document.getElementById('flightvector-demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function FlightVector() {
  // Click-to-play: nothing loads from YouTube until the visitor presses play.
  const [playing, setPlaying] = useState(false)

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
          <a className="fv__btn fv__btn--primary" href={BETA_FORM_URL} target="_blank" rel="noreferrer">Join the beta</a>
          <a className="fv__btn fv__btn--secondary" href="#flightvector" onClick={scrollToDemo}>Watch the demo</a>
        </div>
        <p className="fv__own">Works with the aircraft you already own.</p>
      </section>

      <section className="fv__demo" id="flightvector-demo">
        <figure className="fv__figure">
          <div className="fv__video">
            {playing ? (
              <iframe
                className="fv__iframe"
                src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?rel=0&autoplay=1`}
                title={DEMO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <button
                type="button"
                className="fv__poster"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${DEMO_TITLE}`}
              >
                <img
                  className="fv__poster-img"
                  src="/demo/flightvector-landing-loop.jpg"
                  alt=""
                  width="1280"
                  height="720"
                />
                <span className="fv__play" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="fv__poster-note">Plays on YouTube</span>
              </button>
            )}
          </div>
          <figcaption className="fv__caption">
            Landing practice at St. Maarten in the FlyByWire A32NX: placed on a 0.15 nm final,
            released with the autopilot and autothrust off, and straight back on final after
            every landing. Six landings in 3½ minutes.
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
          <a className="fv__btn fv__btn--inverse" href={BETA_FORM_URL} target="_blank" rel="noreferrer">Sign up for the beta →</a>
        </div>
      </section>

      <p className="fv__note">FlightVector runs on MSFS 2024 for Windows.</p>
    </article>
  )
}
