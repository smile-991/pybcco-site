import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function AnalyticsRouteTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = window.setTimeout(() => {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "virtual_page_view",
        page_path: `${location.pathname}${location.search}`,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  return null;
}