"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (elements.length === 0) {
      // Keep going; new elements can be added later via client state.
    }

    const observed = new WeakSet<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    const observeElement = (element: HTMLElement) => {
      if (observed.has(element)) {
        return;
      }
      observed.add(element);
      observer.observe(element);
    };

    elements.forEach((element) => observeElement(element));

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches?.("[data-reveal]")) {
            observeElement(node);
          }

          node
            .querySelectorAll?.<HTMLElement>("[data-reveal]")
            .forEach((element) => observeElement(element));
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
