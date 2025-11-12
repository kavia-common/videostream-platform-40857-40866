// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns the API base URL from environment variables.
   * Order of preference: REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL.
   * This function avoids hardcoding any URLs.
   */
  return (
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_BACKEND_URL ||
    process.env.REACT_APP_FRONTEND_URL ||
    ""
  );
}

// PUBLIC_INTERFACE
export function getWsUrl() {
  /** Returns the WebSocket URL from environment variables if provided. */
  return process.env.REACT_APP_WS_URL || "";
}
