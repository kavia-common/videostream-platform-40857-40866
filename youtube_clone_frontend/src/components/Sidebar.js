import React from "react";
import { HomeIcon, ShortsIcon, SubsIcon, UserIcon, HistoryIcon } from "./Icon";
import "../theme.css";

function NavItem({ icon, label, href, active }) {
  return (
    <a className={`navItem ${active ? "active" : ""}`} href={href} aria-label={label}>
      <span className="navItemIcon">{icon}</span>
      <span className="navItemLabel">{label}</span>
    </a>
  );
}

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Left navigation rail with icon+label per latest design notes. */
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const isHome = path === "/" || path === "/index.html";

  return (
    <aside className="sidebar" role="navigation" aria-label="Primary">
      <div>
        <NavItem icon={<HomeIcon />} label="Home" href="/" active={isHome} />
        <NavItem icon={<ShortsIcon />} label="Shorts" href="#" />
        <NavItem icon={<SubsIcon />} label="Subscriptions" href="#" />
        <NavItem icon={<UserIcon />} label="You" href="#" />
        <NavItem icon={<HistoryIcon />} label="History" href="#" />
      </div>
    </aside>
  );
}
