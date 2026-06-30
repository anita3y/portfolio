export default function AboutSidebar({ sections, activeId }) {
  return (
    <nav className="about-sidebar" aria-label="About sections">
      <ul className="about-sidebar__list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeId === section.id ? "is-active" : undefined}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
