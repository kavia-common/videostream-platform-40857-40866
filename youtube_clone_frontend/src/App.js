import React from "react";
import "./theme.css";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";

// PUBLIC_INTERFACE
export default function App() {
  /** Root component that renders Home or Results page based on URL path. */
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  if (path.startsWith("/results")) {
    return <ResultsPage />;
  }
  return <HomePage />;
}
