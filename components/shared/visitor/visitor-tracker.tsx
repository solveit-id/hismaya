"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const track = async () => {
      try {
        let sessionId = localStorage.getItem("visitor_session");

        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem("visitor_session", sessionId);
        }

        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            path: window.location.pathname,
          }),
        });
      } catch (error) {
        console.error("Visitor tracking failed:", error);
      }
    };

    track();
  }, []);

  return null;
}