
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/login", label: "Connexion" },
  { href: "/contact", label: "Contact" },
  { href: "/users", label: "Utilisateurs" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="main-navbar">
      <Link href="/" className="navbar-brand">
        <span className="brand-icon">N</span>
        <span>Next<span className="brand-accent">App</span></span>
      </Link>

      <div className="navbar-links">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${active ? "navbar-link-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
