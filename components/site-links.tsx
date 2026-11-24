// Footer on every page: public hub, privacy, status and site feedback. The hub is the public contact route;
// each showcase still avoids linking to the agency portfolio sitewide.
export const contactHref = 'mailto:bookchaowalit.work@gmail.com';
export const portfolioHref = 'https://agency.bookchaowalit.com/agencies';
export const hubHref = 'https://bookchaowalit.com';

export default function SiteLinks() {
  return (
    <nav className="site-links" aria-label="ลิงก์เว็บไซต์">
      <a href={hubHref}>bookchaowalit.com</a>
      <a href="https://bookchaowalit.com/privacy">Privacy</a>
      <a href="https://monitor.bookchaowalit.com/">Status</a>
      {/* Intake on a showcase site is closed, so the footer mail link is for feedback about the site, and says so. */}
      <a href={contactHref}>Site feedback</a>
    </nav>
  );
}
