import './Privacy.css'

export default function Privacy() {
  return (
    <article className="policy">
      <p className="policy__updated">Last updated: 26 October 2026</p>
      <h1 className="policy__title">Privacy Policy</h1>

      <p>
        VFO Simulations (“we,” “us,” “our”) operates vfosimulations.com (the
        “Site”). We respect your privacy and deliberately keep our data practices
        minimal. We do not sell, rent, trade, or otherwise abuse your personal
        information, and we collect as little as possible.
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
        third-party font network.
      </p>

      <h2>Your choices</h2>
      <p>
        You can browse the Site without providing any personal information, and
        you can clear your saved theme preference at any time by clearing your
        browser’s site data.
      </p>

      <h2>Children’s privacy</h2>
      <p>
        The Site is not directed at children under 13, and we do not knowingly
        collect their information.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the Site evolves; we will revise the “Last
        updated” date above when we do.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{' '}
        <a href="mailto:privacy@vfosimulations.com">
          privacy@vfosimulations.com
        </a>
        .
      </p>
    </article>
  )
}
