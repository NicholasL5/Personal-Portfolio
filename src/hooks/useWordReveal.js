import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Wraps every word under `root` in an inline-block span, keeping links and other markup intact.
function splitWords(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  const words = [];
  nodes.forEach((node) => {
    if (!node.nodeValue.trim()) return;
    const frag = document.createDocumentFragment();
    node.nodeValue.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part)); // plain spaces keep wrapping and justify working
        return;
      }
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = part;
      words.push(span);
      frag.appendChild(span);
    });
    node.parentNode.replaceChild(frag, node);
  });
  return words;
}

// GSAP-landing-page style reveal: words slide up and fade in one after another every time the
// section scrolls into view. Pass a ref to anything inside the <section>; headings and
// paragraphs of the whole section are animated.
export default function useWordReveal(ref, selector = "h2, h3, p, figcaption") {
  useLayoutEffect(() => {
    const section = ref.current?.closest("section") ?? ref.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const originals = new Map();
    const ctx = gsap.context(() => {
      section.querySelectorAll(selector).forEach((el) => {
        originals.set(el, el.innerHTML);
        const words = splitWords(el);
        if (!words.length) return;
        gsap.from(words, {
          yPercent: 100,
          opacity: 0,
          rotate: 4,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.04,
          // Replay on every entry (from above or below); reset to hidden once it leaves the viewport.
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom top",
            toggleActions: "restart reset restart reset",
          },
        });
      });

      // Figures: the frame fades up, then the line art draws itself stroke by stroke.
      section.querySelectorAll("figure").forEach((fig) => {
        const frame = fig.querySelector("div");
        // Diagrams run their own node-by-node drawing, so skip the generic stroke draw for them.
        const paths = fig.hasAttribute("data-diagram") ? [] : fig.querySelectorAll("svg path");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: fig,
            start: "top 88%",
            end: "bottom top",
            toggleActions: "restart reset restart reset",
          },
        });
        if (frame) tl.from(frame, { opacity: 0, y: 40, duration: 0.7, ease: "power3.out" });
        if (paths.length) {
          gsap.set(paths, { strokeDasharray: (i, el) => el.getTotalLength() });
          tl.from(
            paths,
            { strokeDashoffset: (i, el) => el.getTotalLength(), duration: 1.2, ease: "power2.inOut", stagger: 0.12 },
            0.3,
          );
        }
      });
    }, section);

    return () => {
      ctx.revert();
      originals.forEach((html, el) => (el.innerHTML = html));
    };
  }, [ref, selector]);
}
