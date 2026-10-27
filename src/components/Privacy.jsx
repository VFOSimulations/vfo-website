import './Privacy.css'

export default function Privacy() {
  return (
    <article className="policy">
      <p className="policy__updated">Last updated: 27 October 2026</p>
      <h1 className="policy__title">Privacy Policy</h1>

      <p>
        VFO Simulations (“we,” “us,” “our”) operates vfosimulations.com (the
        “Site”). We respect your privacy and deliberately keep our data practices
        minimal. We do not sell, rent, trade, or otherwise abuse your personal
        information, and we collect as little as possible.
      </p>

      <h2>Who is responsible</h2>
      <p>
        The data controller for the Site is [LEGAL NAME — the company, or Rori
        Stumpf trading as VFO Simulations], [POSTAL ADDRESS]. You can reach us
        about anything in this policy at{' '}
        <a href="mailto:privacy@vfosim.com">privacy@vfosim.com</a>.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you provide.</strong> The Site has no accounts or
          comment sections. The only personal information we collect is what you
          choose to enter in the FlightVector beta sign-up form (such as your
          name, email address, simulator setup and the aircraft you fly). That
          form is hosted on Google Forms, so Google processes it under the{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google Privacy Policy
          </a>
          . We use your answers only to select beta testers and to contact you
          about the beta, keep them only as long as the beta needs them, and
          delete them on request.
        </li>
        <li>
          <strong>Embedded video.</strong> The FlightVector page shows a still
          image, served from the Site itself, in place of its demo video. Nothing
          is loaded from YouTube until you press play. When you do, the YouTube
          player loads in its privacy-enhanced mode (youtube-nocookie.com), and
          YouTube (Google) processes data such as your IP address under the{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Local preferences.</strong> The Site remembers your light or
          dark theme choice using your browser’s local storage. This stays on
          your device and is never transmitted to us.
        </li>
        <li>
          <strong>Analytics.</strong> We use Cloudflare Web Analytics, a
          privacy-first measurement tool that is cookieless and does not collect
          personal data or fingerprint your device. It reports only aggregate,
          anonymous usage such as page views and referrers. See{' '}
          <a
            href="https://www.cloudflare.com/web-analytics/"
            target="_blank"
            rel="noreferrer"
          >
            Cloudflare Web Analytics
          </a>{' '}
          for details.
        </li>
        <li>
          <strong>Server logs.</strong> The Site is hosted on GitHub Pages. As
          with any website, the hosting provider may automatically record
          standard technical data such as IP address and browser type to deliver
          and secure the Site. That processing is governed by{' '}
          <a
            href="https://docs.github.com/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noreferrer"
          >
            GitHub’s Privacy Statement
          </a>
          .
        </li>
      </ul>

      <h2>How we use information</h2>
      <p>
        Solely to operate, maintain, secure, and understand basic usage of the
        Site. We do not use it for advertising or profiling, and we will not
        share it except as needed to host the Site or to comply with the law.
      </p>

      <h2>Cookies</h2>
      <p>
        We do not set advertising or analytics cookies. Our analytics is
        cookieless, and our fonts are served from the Site itself rather than a
        third-party font network. If you press play on the demo video, the
        YouTube player loads and may store data in your browser.
      </p>

      <h2>Legal basis (EU and UK visitors)</h2>
      <ul>
        <li>
          <strong>Beta sign-up:</strong> your consent, given when you submit the
          form. You can withdraw it at any time by emailing us, and we will
          delete your answers.
        </li>
        <li>
          <strong>Analytics and server logs:</strong> our legitimate interest in
          running, securing and understanding basic use of the Site. Neither
          identifies you to us.
        </li>
        <li>
          <strong>Theme preference:</strong> stored only because you chose it,
          and only on your device.
        </li>
        <li>
          <strong>Demo video:</strong> loads only when you press play.
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        Beta sign-up answers are kept until the beta ends and deleted within 90
        days after that, unless you become a customer or ask us to delete them
        sooner. Analytics are aggregate and kept by Cloudflare under its own
        terms. Server logs are kept by GitHub under its privacy statement.
      </p>

      <h2>Where your data is processed</h2>
      <p>
        Google (the sign-up form and the video), Cloudflare (analytics) and
        GitHub (hosting) may process data in the United States. These transfers
        rely on the EU–US Data Privacy Framework and its UK extension, or on the
        European Commission’s standard contractual clauses.
      </p>

      <h2>Your rights</h2>
      <p>
        You can browse the Site without providing any personal information, and
        you can clear your saved theme preference at any time by clearing your
        browser’s site data.
      </p>
      <p>
        If you are in the EU or the UK, you have the right to access the
        personal information we hold about you, to have it corrected or deleted,
        to restrict or object to its use, to receive a copy of it, and to
        withdraw consent at any time. Email{' '}
        <a href="mailto:privacy@vfosim.com">privacy@vfosim.com</a> and we will
        reply within one month. You can also complain to your local data
        protection authority (in the UK, the Information Commissioner’s Office).
      </p>
      <p>
        Wherever you live, you can ask us what we hold about you and ask us to
        delete it, and we will do so.
      </p>

      <h2>California and other US states</h2>
      <p>
        We do not sell or share personal information, and we do not use it for
        targeted advertising. The Site does not track you across other websites,
        so it treats browsers that send a Do Not Track or Global Privacy Control
        signal the same as everyone else: no tracking either way.
      </p>

      <h2>Children’s privacy</h2>
      <p>
        The Site is not directed at children under 13 (under 16 in the EU), and
        we do not knowingly collect their information. If you believe a child
        has signed up, email us and we will delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the Site evolves; we will revise the “Last
        updated” date above when we do.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{' '}
        <a href="mailto:privacy@vfosim.com">
          privacy@vfosim.com
        </a>
        .
      </p>
    </article>
  )
}
