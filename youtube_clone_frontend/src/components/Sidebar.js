import React from "react";
import { HomeIcon, ShortsIcon, SubsIcon, UserIcon, HistoryIcon } from "./Icon";
import "../theme.css";

function NavItem({ icon, label, href, active }) {
  return (
    <a className={`navItem ${active ? "active" : ""}`} href={href}>
      <span className="navItemIcon">{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
    </a>
  );
}

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Left navigation sidebar with Explore section. */
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const isHome = path === "/" || path === "/index.html";
  const isResults = path.startsWith("/results");

  return (
    <aside className="sidebar" role="navigation" aria-label="Primary">
      <div style={{ padding: "0 8px" }}>
        <NavItem icon={<HomeIcon />} label="Home" href="/" active={isHome} />
        <NavItem icon={<ShortsIcon />} label="Shorts" href="#" />
        <NavItem icon={<SubsIcon />} label="Subscriptions" href="#" />
        <NavItem icon={<UserIcon />} label="You" href="#" />
        <NavItem icon={<HistoryIcon />} label="History" href="#" />
        <div className="navSectionLabel" style={{ marginTop: 8 }}>
          Explore
        </div>
        <NavItem icon={<HomeIcon />} label="Trending" href="#" active={false} />
        <NavItem icon={<HomeIcon />} label="Music" href="#" active={false} />
        <NavItem icon={<HomeIcon />} label="Gaming" href="#" active={false} />
        <NavItem icon={<HomeIcon />} label="News" href="#" active={false} />
        <NavItem icon={<HomeIcon />} label="Sports" href="#" active={false} />
        {isResults ? (
          <div className="navSectionLabel" style={{ marginTop: 8 }}>
            Results
          </div>
        ) : null}
      </div>
    </aside>
  );
}
