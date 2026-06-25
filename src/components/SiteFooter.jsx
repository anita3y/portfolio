const CONNECT_LINKS = [
  {
    id: "email",
    label: "Email anita3yan@gmail.com",
    text: "anita3yan@gmail.com",
    href: "mailto:anita3yan@gmail.com",
    icon: "email"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anita-yan-9ifg3426",
    external: true,
    icon: "linkedin"
  },
  { id: "x", label: "X", href: "https://x.com/nitayxxn", external: true, icon: "x" }
];

function FooterLinkIcon({ name }) {
  if (name === "email") {
    return (
      <svg className="site-footer__icon site-footer__icon--email" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
        />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg className="site-footer__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        />
      </svg>
    );
  }

  return (
    <svg className="site-footer__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__tab">
        <div className="site-footer__main">
          <div className="site-footer__identity">
            <p className="site-footer__brand">Anita Yan</p>
          </div>

          <div className="site-footer__connect">
            <p className="site-footer__connect-label">Let&apos;s stay connected!</p>
            <nav className="site-footer__nav" aria-label="Contact links">
              {CONNECT_LINKS.map((link) => (
                <a
                  key={link.id}
                  className={`site-footer__link${
                    link.icon && !link.text ? " site-footer__link--icon" : ""
                  }`}
                  href={link.href}
                  aria-label={link.label}
                  data-cursor-morph=""
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.text ? (
                    <>
                      <span className="site-footer__link-text">{link.text}</span>
                      <FooterLinkIcon name={link.icon} />
                    </>
                  ) : (
                    <FooterLinkIcon name={link.icon} />
                  )}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <p className="site-footer__credit">
        Built with React, Vite, and React Router — and{" "}
        <a
          className="site-footer__credit-link"
          href="https://www.georgies.cafe/menu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Georgie&apos;s
        </a>{" "}
        Hong Kong Milk Tea
      </p>
    </footer>
  );
}
