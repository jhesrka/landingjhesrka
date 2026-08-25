"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const PageTracker = () => {
  const pathname = usePathname();
  const trackedPaths = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Evitar contar rastreos duplicados en la misma visita si el estado cambia
    if (!pathname || trackedPaths.current.has(pathname)) return;

    const trackView = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
        });
        trackedPaths.current.add(pathname);
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    };

    // Agregar un pequeño delay para no bloquear el renderizado
    const timeout = setTimeout(trackView, 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};
