export const metadata = { title: 'Accessibility & Privacy' };
export default function AccessibilityPrivacyPage(){
  return(<section className="section"><div className="container">
    <h1>Accessibility & Privacy</h1>
    <h2>Accessibility statement</h2>
    <p>We aim to meet WCAG 2.2 AA across core journeys. If you encounter barriers, email <a href="mailto:access@example-osdc.gov.uk">access@example-osdc.gov.uk</a>.</p>
    <ul>
      <li>Skip link to main content</li><li>Keyboard-accessible navigation, carousel and modals</li>
      <li>Visible focus state and sufficient colour contrast</li><li>Respects reduced motion preferences</li>
    </ul>
    <h2>Privacy & GDPR</h2>
    <p>We process only essential data to operate this website. Analytics cookies are disabled by default and activated only on consent.</p>
    <p>You can withdraw consent at any time by clearing site data or contacting <a href="mailto:privacy@example-osdc.gov.uk">privacy@example-osdc.gov.uk</a>.</p>
  </div></section>);
}
