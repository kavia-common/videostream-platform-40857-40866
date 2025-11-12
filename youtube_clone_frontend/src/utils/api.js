import { getApiBase } from "./env";

/**
 * Lightweight API helper for the YouTube clone UI.
 * Uses environment variables for base URL; returns mocked placeholders if no backend.
 */

// PUBLIC_INTERFACE
export async function searchVideos(query, page = 1) {
  /** Search videos via backend or return placeholder data if backend URL is not present. */
  const base = getApiBase();
  if (!base) {
    // Placeholder mocked results for UI development
    return {
      items: Array.from({ length: 6 }).map((_, i) => ({
        id: `mock-${page}-${i}`,
        title: `Sample result for "${query}" — Episode ${i + 1}`,
        channel: "Kavin AI",
        views: `${(Math.random() * 900 + 100).toFixed(0)}K views`,
        time: `${(Math.random() * 10 + 1).toFixed(0)} months ago`,
        description:
          "This is a placeholder description demonstrating a two-line clamp in the UI. It should truncate gracefully.",
        thumbnail:
          `https://picsum.photos/seed/${encodeURIComponent(query)}-${page}-${i}/640/360`,
      })),
      nextPage: page + 1,
    };
  }
  const url = new URL("/api/search", base);
  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function getHomeFeed(page = 1) {
  /** Get home feed via backend or return placeholder data. */
  const base = getApiBase();
  if (!base) {
    return {
      items: Array.from({ length: 12 }).map((_, i) => ({
        id: `home-${page}-${i}`,
        title: `Recommended video ${i + 1}`,
        channel: "Ocean Pro",
        views: `${(Math.random() * 900 + 100).toFixed(0)}K views`,
        time: `${(Math.random() * 10 + 1).toFixed(0)} days ago`,
        thumbnail: `https://picsum.photos/seed/home-${page}-${i}/640/360`,
      })),
      nextPage: page + 1,
    };
  }
  const url = new URL("/api/home", base);
  url.searchParams.set("page", String(page));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Home feed failed: ${res.status}`);
  return res.json();
}
