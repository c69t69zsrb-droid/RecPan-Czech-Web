import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { trackNavigation } from "@/lib/navigationHistory";

// Take full control of scroll restoration so we can handle the homepage's
// custom scroll container as well as regular window-scrolled pages.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const positions = new Map();

const getScrollContainer = () =>
  typeof document !== "undefined"
    ? document.querySelector(".snap-container")
    : null;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    trackNavigation(pathname);
  }, [pathname]);

  // Keep the latest scroll position for the current location so we can
  // restore it accurately when returning via Back/Forward.
  useEffect(() => {
    let ticking = false;

    const record = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const container = getScrollContainer();
        positions.set(
          pathname,
          container ? container.scrollTop : window.scrollY
        );
      });
    };

    const container = getScrollContainer();
    container?.addEventListener("scroll", record, { passive: true });
    window.addEventListener("scroll", record, { passive: true });
    record();

    return () => {
      container?.removeEventListener("scroll", record);
      window.removeEventListener("scroll", record);
    };
  }, [pathname]);

  // Restore the saved position on Back/Forward; otherwise start at the top.
  useLayoutEffect(() => {
    if (hash) return;

    const container = getScrollContainer();
    const saved = navigationType === "POP" ? positions.get(pathname) : undefined;
    const target = saved ?? 0;

    if (container) {
      container.scrollTop = target;
    } else {
      window.scrollTo(0, target);
    }
  }, [pathname, hash, navigationType]);

  // Smooth-scroll to an in-page section when the URL carries a hash.
  useEffect(() => {
    if (!hash) return;

    const rawId = hash.slice(1);
    let id;
    try {
      id = decodeURIComponent(rawId);
    } catch {
      id = rawId;
    }

    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const container = getScrollContainer();
      if (container) {
        const elRect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        container.scrollTo({
          top: container.scrollTop + elRect.top - containerRect.top,
          behavior: "smooth",
        });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 90);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}