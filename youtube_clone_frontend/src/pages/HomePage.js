import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getHomeFeed } from "../utils/api";
import "../theme.css";

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Home page with a responsive grid of recommended videos. */
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    getHomeFeed(1)
      .then((data) => {
        if (ignore) return;
        setItems(data.items || []);
        setNextPage(data.nextPage || null);
      })
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  const loadMore = async () => {
    if (!nextPage || loading) return;
    setLoading(true);
    try {
      const data = await getHomeFeed(nextPage);
      setItems((prev) => [...prev, ...(data.items || [])]);
      setNextPage(data.nextPage || null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appShell">
      <Header onMenuToggle={() => {}} />
      <Sidebar />
      <main className="main" role="main">
        <div className="container">
          <div className="homeGrid">
            {items.map((it) => (
              <a className="homeCard" key={it.id} href="#">
                <div className="homeThumb">
                  <img
                    src={it.thumbnail}
                    alt={it.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="homeTitle">{it.title}</div>
                <div className="homeMeta">
                  {it.channel} • {it.views} • {it.time}
                </div>
              </a>
            ))}
          </div>
          {nextPage && (
            <div style={{ display: "flex", justifyContent: "center", padding: "16px 0 40px" }}>
              <button
                className="iconBtn"
                style={{
                  padding: "0 16px",
                  width: "auto",
                  height: 40,
                  borderRadius: 20,
                  background: "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(245,158,11,0.25))",
                  border: `1px solid var(--border-subtle)`,
                }}
                onClick={loadMore}
                aria-label="Load more videos"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
