import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ROSE_STROKES, ROSE_VIEWBOX } from "../rose.js";

gsap.registerPlugin(ScrollTrigger);

// Pen speed in viewBox units per second, so long strokes take proportionally longer.
const SPEED = 2300;

// Continuous-line rose that draws itself, pen-style, every time it scrolls into view.
export default function RoseFigure({ caption = "Fig 1.", captionAbove = false, aspect = "aspect-[285/460]", className = "" }) {
  const figRef = useRef(null);

  useLayoutEffect(() => {
    const fig = figRef.current;
    if (!fig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Hidden = the dash pattern shifted just past the start of the path. Shifted exactly to the start,
      // the round line caps would still paint a dot there.
      fig.querySelectorAll("svg path").forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: `${len} ${len + 2}`, strokeDashoffset: len + 1 });
      });

      const tl = gsap.timeline({
        delay: 0.3,
        scrollTrigger: {
          trigger: fig,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "restart reset restart reset",
        },
      });

      // A stroke's pieces are drawn back to back at a constant rate, and the whole stroke is eased as
      // one movement, so the pen only speeds up and slows down at the ends of the stroke.
      fig.querySelectorAll("[data-stroke]").forEach((stroke, i) => {
        const pen = gsap.timeline({ paused: true });
        stroke.querySelectorAll("path").forEach((p) => {
          pen.to(p, { strokeDashoffset: 0, duration: p.getTotalLength() / SPEED, ease: "none" });
        });
        tl.to(pen, { progress: 1, duration: pen.duration(), ease: "power1.inOut" }, i ? "-=0.5" : 0);
      });
    }, fig);

    return () => ctx.revert();
  }, []);

  const cap = <figcaption className="my-2 text-sm font-bold">{caption}</figcaption>;

  return (
    <figure ref={figRef} data-diagram className={`m-0 ${className}`}>
      {captionAbove && cap}
      <div className={`${aspect} border-2 border-ink p-6`}>
        <svg
          className="h-full w-full"
          viewBox={ROSE_VIEWBOX}
          fill="none"
          stroke="currentColor"
          strokeWidth="4.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          role="img"
          aria-label="Single-line drawing of a rose bud on a long stem rising out of a looped heart above a gentle wave"
        >
          {ROSE_STROKES.map((pieces, i) => (
            <g key={i} data-stroke>
              {pieces.map((d, j) => (
                <path key={j} d={d} />
              ))}
            </g>
          ))}
        </svg>
      </div>
      {!captionAbove && cap}
    </figure>
  );
}
