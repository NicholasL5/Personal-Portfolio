import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { diagrams } from "../diagrams.js";

gsap.registerPlugin(ScrollTrigger);

const boxPath = ({ x, y, w, h }) => `M${x} ${y} h${w} v${h} h${-w} Z`;

const dbPath = ({ x, y, w, h }) =>
  `M${x} ${y + 6} a${w / 2} 6 0 0 1 ${w} 0 a${w / 2} 6 0 0 1 ${-w} 0 Z` +
  ` M${x} ${y + 6} V${y + h - 6} a${w / 2} 6 0 0 0 ${w} 0 V${y + 6}`;

const head = (tip, from) => {
  const dx = tip[0] - from[0];
  const dy = tip[1] - from[1];
  const l = Math.hypot(dx, dy) || 1;
  const ux = dx / l;
  const uy = dy / l;
  const bx = tip[0] - ux * 6;
  const by = tip[1] - uy * 6;
  return `M${bx - uy * 5} ${by + ux * 5} L${tip[0]} ${tip[1]} L${bx + uy * 5} ${by - ux * 5}`;
};

const edgePath = ({ points, arrow = "end" }) => {
  const n = points.length;
  let d = "M" + points.map((p) => p.join(" ")).join(" L");
  if (arrow !== "none") d += " " + head(points[n - 1], points[n - 2]);
  if (arrow === "both") d += " " + head(points[0], points[1]);
  return d;
};

export default function DiagramFigure({
  variant = "pipeline",
  caption,
  captionAbove = false,
  aspect = "aspect-[375/410]",
  className = "",
}) {
  const figRef = useRef(null);
  const spec = diagrams[variant] ?? diagrams.pipeline;

  useLayoutEffect(() => {
    const fig = figRef.current;
    if (!fig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const len = (i, el) => el.getTotalLength();
      gsap.set(fig.querySelectorAll("svg path"), { strokeDasharray: len });

      const tl = gsap.timeline({
        delay: 0.3,
        scrollTrigger: {
          trigger: fig,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "restart reset restart reset",
        },
      });

      const waves = [...new Set([...fig.querySelectorAll("[data-wave]")].map((el) => Number(el.dataset.wave)))].sort(
        (a, b) => a - b,
      );
      waves.forEach((w, i) => {
        const els = [...fig.querySelectorAll(`[data-wave="${w}"]`)];
        const paths = els.flatMap((el) => (el.tagName === "path" ? [el] : [...el.querySelectorAll("path")]));
        const texts = els.flatMap((el) => [...el.querySelectorAll("text")]);
        tl.from(paths, { strokeDashoffset: len, duration: 0.5, ease: "power2.inOut" }, i ? "-=0.1" : 0);
        if (texts.length) tl.from(texts, { opacity: 0, duration: 0.3, stagger: 0.05 }, "-=0.3");
      });
    }, fig);

    return () => ctx.revert();
  }, [variant]);

  const cap = <figcaption className="my-2 text-sm font-bold">{caption}</figcaption>;

  return (
    <figure ref={figRef} data-diagram className={`m-0 ${className}`}>
      {captionAbove && cap}
      <div className={`${aspect} border-2 border-ink p-6`}>
        <svg
          className="h-full w-full"
          viewBox="0 0 300 316"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          role="img"
          aria-label={spec.label}
        >
          {spec.nodes.map((n) => {
            const isDb = n.shape === "db";
            const mid = n.y + n.h / 2 + (isDb ? 3 : 0); // nudge text below the cylinder lid
            return (
              <g key={`${n.title}-${n.x}-${n.y}`} data-wave={n.wave}>
                <path d={isDb ? dbPath(n) : boxPath(n)} />
                <text
                  x={n.x + n.w / 2}
                  y={n.sub ? mid - 1 : mid + 4}
                  textAnchor="middle"
                  stroke="none"
                  fill="currentColor"
                  fontSize={n.titleSize ?? 13}
                  fontWeight="700"
                  className="font-serif"
                >
                  {n.title}
                </text>
                {n.sub && (
                  <text
                    x={n.x + n.w / 2}
                    y={mid + 13}
                    textAnchor="middle"
                    stroke="none"
                    fill="currentColor"
                    fontSize={n.subSize ?? 8.5}
                    className="font-mono"
                  >
                    {n.sub}
                  </text>
                )}
              </g>
            );
          })}
          {spec.edges.map((e, i) => (
            <path key={i} data-wave={e.wave} d={edgePath(e)} />
          ))}
        </svg>
      </div>
      {!captionAbove && cap}
    </figure>
  );
}
