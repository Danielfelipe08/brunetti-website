"use client";

import { useEffect } from "react";

// Enter pinned scenes at a readable point without changing their scroll timelines.
const pinnedAnchors: Record<string, { track: string; offset: number }> = {
  "#manifesto": { track: ".manifesto-track", offset: 1.2 },
  "#makeover": { track: ".makeover-track", offset: .88 },
};

export function HomeAnchorNavigation() {
  useEffect(() => {
    const desktopMotion = window.matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let disposed = false;

    const arrive = (hash: string, smooth: boolean) => {
      const destination = pinnedAnchors[hash];
      if (!destination || !desktopMotion.matches) return;
      const track = document.querySelector<HTMLElement>(destination.track);
      const section = document.getElementById(hash.slice(1));
      if (!track || !section) return;
      const top = window.scrollY + track.getBoundingClientRect().top + window.innerHeight * destination.offset;
      window.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
      // Preserve native anchor keyboard navigation without another scroll jump.
      const previousTabIndex = section.getAttribute("tabindex");
      section.setAttribute("tabindex", "-1");
      section.focus({ preventScroll: true });
      if (previousTabIndex === null) section.removeAttribute("tabindex");
      else section.setAttribute("tabindex", previousTabIndex);
    };
    const schedule = (hash: string, smooth: boolean) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => arrive(hash, smooth));
    };
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !pinnedAnchors[url.hash] || !desktopMotion.matches) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      schedule(url.hash, true);
    };
    const onHashChange = () => schedule(location.hash, false);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    // Fonts and sibling effects must settle before measuring an initial deep link.
    void document.fonts.ready.then(() => {
      if (!disposed && location.hash) schedule(location.hash, false);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
  return null;
}
