import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CodeFigure({ caption, code, filename = "code.txt", captionAbove = false, aspect = "aspect-[375/410]", className = "" }) {
  const figRef = useRef(null);
  const codeRef = useRef(null);

  useLayoutEffect(() => {
    const fig = figRef.current;
    const el = codeRef.current;
    if (!fig || !el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = code;
      return;
    }

    const state = { n: 0 };
    const tween = gsap.to(state, {
      n: code.length,
      duration: Math.min(2.5, code.length * 0.05),
      ease: "none",
      paused: true,
      onUpdate: () => {
        el.textContent = code.slice(0, Math.floor(state.n));
      },
    });
    const reset = () => {
      tween.pause(0);
      el.textContent = "";
    };
    reset();

    const trigger = ScrollTrigger.create({
      trigger: fig,
      start: "top 75%",
      end: "bottom top",
      onEnter: () => tween.restart(),
      onEnterBack: () => tween.restart(),
      onLeave: reset,
      onLeaveBack: reset,
    });

    return () => {
      trigger.kill();
      tween.kill();
      el.textContent = code;
    };
  }, [code]);

  const cap = <figcaption className="my-2 text-sm font-bold">{caption}</figcaption>;

  return (
    <figure ref={figRef} className={`m-0 ${className}`}>
      {captionAbove && cap}
      <div className={`${aspect} overflow-hidden border-2 border-ink bg-ink text-paper`}>
        <div className="flex items-center gap-1.5 border-b border-paper/20 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-paper/60" />
          <span className="size-2.5 rounded-full bg-paper/40" />
          <span className="size-2.5 rounded-full bg-paper/20" />
          <span className="ml-3 font-mono text-xs text-paper/60">{filename}</span>
        </div>
        <pre aria-hidden="true" className="m-0 p-5 font-mono text-sm leading-relaxed whitespace-pre">
          <code ref={codeRef} />
        </pre>
        <span className="sr-only">{code}</span>
      </div>
      {!captionAbove && cap}
    </figure>
  );
}
