import React, { useState } from "react";
import { MenuIcon, SearchIcon, MicIcon, CreateIcon, BellIcon, AppsIcon } from "./Icon";
import "../theme.css";

// PUBLIC_INTERFACE
export default function Header({ onMenuToggle, initialQuery = "" }) {
  /** Header with logo, search, and action icons (per latest design notes). */
  const [q, setQ] = useState(initialQuery);

  const submit = (e) => {
    e.preventDefault();
    const search = q.trim();
    if (!search) return;
    const params = new URLSearchParams({ search_query: search });
    // Navigate using location to avoid adding router deps.
    window.location.href = `/results?${params.toString()}`;
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") setQ("");
  };

  return (
    <header className="headerBar" role="banner">
      <div className="headerCluster">
        <button className="iconBtn" aria-label="Open menu" onClick={onMenuToggle}>
          <MenuIcon />
        </button>
        <a className="brand" aria-label="YouTube clone home" href="/">
          <span className="brandMark" />
          <span>YouTube</span>
        </a>
      </div>

      <div className="headerCluster center">
        <form className="searchWrap" onSubmit={submit} role="search" aria-label="Site">
          <div className="searchGroup">
            <input
              className="searchInput"
              type="search"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Search"
            />
            <button className="searchBtn" type="submit" aria-label="Search">
              <SearchIcon />
            </button>
          </div>
          <button className="micBtn" type="button" aria-label="Voice search (placeholder)">
            <MicIcon />
          </button>
        </form>
      </div>

      <div className="headerCluster right">
        <button className="iconBtn" aria-label="Create">
          <CreateIcon />
        </button>
        <button className="iconBtn" aria-label="Apps">
          <AppsIcon />
        </button>
        <button className="iconBtn" aria-label="Notifications">
          <BellIcon />
        </button>
        <button className="iconBtn" aria-label="User menu">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, var(--ocean-primary), var(--ocean-secondary))",
            }}
          />
        </button>
      </div>
    </header>
  );
}
