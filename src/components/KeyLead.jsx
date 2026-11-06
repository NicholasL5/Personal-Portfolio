import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Collects every text node under `root`, in document order, so links and other markup survive typing.
function getTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

// Same layout as Lead, but the drop cap is a clickable keycap that presses down and pops on click.
// Clicking it also types out the lead and body text with GSAP.
export default function KeyLead({ letter, children, body, onClick, className = "" }) {
  const [pops, setPops] = useState(0);
  const leadRef = useRef(null);
  const bodyRef = useRef(null);
  const tweenRef = useRef(null);

  // Lead first, then body, so the text types in reading order.
  const typedEls = () => [leadRef.current, bodyRef.current].filter(Boolean);

  const restore = () => {
    tweenRef.current?.kill();
    tweenRef.current = null;
    typedEls().forEach((el) => {
      el.style.minHeight = "";
      getTextNodes(el).forEach((n) => {
        if (n.fullText !== undefined) n.nodeValue = n.fullText;
      });
    });
  };

  useEffect(() => restore, []);

  const typeBody = () => {
    const els = typedEls();
    if (!els.length) return;
    restore();

    const nodes = els.flatMap(getTextNodes);
    nodes.forEach((n) => (n.fullText = n.nodeValue));
    const total = nodes.reduce((sum, n) => sum + n.fullText.length, 0);

    // Hold the final height so the page doesn't jump while text grows.
    els.forEach((el) => (el.style.minHeight = `${el.offsetHeight}px`));

    const state = { chars: 0 };
    tweenRef.current = gsap.to(state, {
      chars: total,
      duration: Math.min(3, total * 0.1),
      ease: "none",
      onUpdate: () => {
        let left = Math.floor(state.chars);
        for (const n of nodes) {
          const take = Math.max(0, Math.min(n.fullText.length, left));
          n.nodeValue = n.fullText.slice(0, take);
          left -= take;
        }
      },
      onComplete: restore,
    });
    // Render the empty state immediately rather than waiting for the first tick.
    tweenRef.current.progress(0.0001);
  };

  const handleClick = (e) => {
    setPops((n) => n + 1);
    typeBody();
    onClick?.(e);
  };

  return (
    <div className={`max-w-[640px] ${className}`}>
      <div className="flow-root">
        <button
          type="button"
          onClick={handleClick}
          aria-label={`Key ${letter}`}
          className="relative float-left mr-4 mb-3 size-[138px] cursor-pointer select-none rounded-lg border-2 border-ink bg-paper font-display text-7xl font-black shadow-[0_8px_0_0_var(--color-ink)] transition-[transform,box-shadow] duration-75 hover:-translate-y-0.5 hover:shadow-[0_10px_0_0_var(--color-ink)] active:translate-y-2 active:shadow-[0_0_0_0_var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          {/* Inner top face of the cap */}
          <span className="absolute inset-2 grid place-items-center rounded-md border border-ink/40 bg-white/20">
            {/* Keyed so each click remounts it and replays the ripple */}
            <span
              key={pops}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-md border-2 border-ink ${pops ? "animate-ping" : "hidden"}`}
              style={{ animationIterationCount: 1 }}
            />
            <span
              key={`letter-${pops}`}
              className={`inline-block ${pops ? "animate-[bounce_0.35s_ease-out_1]" : ""}`}
            >
              {letter}
            </span>
          </span>
        </button>
        <p ref={leadRef} className="m-0 text-[1.65rem] leading-snug font-bold">{children}</p>
      </div>
      {body && <p ref={bodyRef} className="mt-6 text-xl leading-relaxed">{body}</p>}
    </div>
  );
}
