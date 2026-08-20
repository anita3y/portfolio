import { assetUrl } from "../utils/assetUrl.js";

const FOOTER_LINKS = [
  {
    id: "x",
    label: "X",
    href: "https://x.com/nitayxxn",
    external: true
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anitayandesign/",
    external: true
  },
  {
    id: "gmail",
    label: "gmail",
    href: "mailto:anita3yan@gmail.com",
    external: false
  }
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <p className="site-footer__name">Anita Yan</p>
        <div className="site-footer__connect">
          <img
            className="site-footer__scribble"
            src={assetUrl("/footer/lets-connect.png")}
            alt=""
            draggable={false}
          />
          <nav className="tabs tabs--select site-footer__links" aria-label="Contact links">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.id}
                className="tab"
                href={link.href}
                aria-label={link.label}
                data-cursor-hover=""
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
