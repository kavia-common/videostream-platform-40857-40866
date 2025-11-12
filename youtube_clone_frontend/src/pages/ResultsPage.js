import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ResultItem from "../components/ResultItem";
import { searchVideos } from "../utils/api";
import "../theme.css";

// PUBLIC_INTERFACE
export default function ResultsPage() {
  /**
   * Search results page.
   * Reads search_query from the URL and renders a vertical list of results.
   */
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const query = params.get("search_query") || "";
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setItems([]);
    setPage(1);
    setNextPage(null);
    if (!query) return;
    setLoading(true);
    searchVideos(query, 1)
      .then((data) => {
        if (ignore) return;
        setItems(data.items || []);
        setNextPage(data.nextPage || null);
      })
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [query]);

  const loadMore = async () => {
    if (!nextPage || loading) return;
    setLoading(true);
    try {
      const data = await searchVideos(query, nextPage);
      setItems((prev) => [...prev, ...(data.items || [])]);
      setNextPage(data.nextPage || null);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appShell">
      <Header initialQuery={query} onMenuToggle={() => {}} />
      <Sidebar />
      <main className="main" role="main">
        <div className="container">
          <div className="resultsList" aria-live="polite">
            {items.map((it) => (
              <ResultItem key={it.id} item={it} />
            ))}
            {loading && <div style={{ color: "var(--text-secondary)" }}>Loading…</div>}
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
                aria-label="Load more results"
              >
                Load more
              </button>
            </div>
          )}
          {!loading && items.length === 0 && (
            <div style={{ color: "var(--text-secondary)", paddingTop: 24 }}>
              No results yet. Try a different search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
