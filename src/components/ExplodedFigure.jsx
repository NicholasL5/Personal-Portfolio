import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Isometric helpers -------------------------------------------------------
// P(u, v, z) projects a point on a floor plane (u to the right-down, v to the left-down, z up)
// onto the screen. `cx` and `T` are the screen position of the layer's top-face centre.
const C = 0.866;
const makeProjector = (cx, T) => (u, v, z = 0) => [cx + (u - v) * C, T + (u + v) * 0.5 - z];
const pt = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const poly = (pts, close = true) => "M" + pts.map(pt).join(" L") + (close ? " Z" : "");
const line = (P, pts) => poly(pts.map(([u, v, z = 0]) => P(u, v, z)), false);
const rect = (P, u0, v0, w, d, z = 0) =>
  poly([P(u0 - w / 2, v0 - d / 2, z), P(u0 + w / 2, v0 - d / 2, z), P(u0 + w / 2, v0 + d / 2, z), P(u0 - w / 2, v0 + d / 2, z)]);

// Low-poly box: top face plus the two faces turned toward the viewer.
const slab = (P, u0, v0, w, d, zt, zb) => {
  const [x0, x1, y0, y1] = [u0 - w / 2, u0 + w / 2, v0 - d / 2, v0 + d / 2];
  const A = P(x0, y0, zt), B = P(x1, y0, zt), Cc = P(x1, y1, zt), D = P(x0, y1, zt);
  const B0 = P(x1, y0, zb), C0 = P(x1, y1, zb), D0 = P(x0, y1, zb);
  return `${poly([A, B, Cc, D])} ${poly([D, Cc, C0, D0])} ${poly([Cc, B, B0, C0])}`;
};

// Octagonal fan with four blades.
const fan = (P, u0, v0, z, r) => {
  const ring = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4;
    return P(u0 + r * Math.cos(a), v0 + r * Math.sin(a), z);
  });
  const hub = P(u0, v0, z);
  return poly(ring) + [0, 2, 4, 6].map((k) => ` M${pt(hub)} L${pt(ring[k])}`).join("");
};

// --- Parts, bottom to top (later parts are drawn over earlier ones) ----------------
const CX = 100;

const base = (() => {
  const P = makeProjector(CX, 272);
  return [slab(P, 0, 0, 64, 64, 0, -4), rect(P, 0, 0, 50, 50)];
})();

const psu = (() => {
  const P = makeProjector(CX, 228);
  const grill = [-12, -6, 0, 6, 12].map((u) => line(P, [[u, -11], [u, 11]]));
  return [slab(P, 0, 0, 40, 32, 0, -18), ...grill];
})();

const gpu = (() => {
  const P = makeProjector(CX, 190);
  return [slab(P, 0, 0, 54, 20, 0, -6), fan(P, -13, 0, 0, 6), fan(P, 13, 0, 0, 6)];
})();

const motherboard = (() => {
  const P = makeProjector(CX, 142);
  return [
    slab(P, 0, 0, 58, 58, 0, -3),
    line(P, [[-29, -29], [29, 29]]), // low-poly facet
    slab(P, -19, -4, 4, 28, 11, 0), // RAM
    slab(P, -12, -4, 4, 28, 11, 0),
    slab(P, 9, 6, 20, 20, 3, 0), // CPU socket
    rect(P, 9, 6, 12, 12, 3),
  ];
})();

const cooler = (() => {
  const P = makeProjector(CX, 66);
  return [
    slab(P, 0, 0, 26, 26, 0, -12),
    fan(P, 0, 0, 0, 9),
    line(P, [[-13, 13, -4], [13, 13, -4], [13, -13, -4]]), // fins
    line(P, [[-13, 13, -8], [13, 13, -8], [13, -13, -8]]),
  ];
})();

const PARTS = [base, psu, gpu, motherboard, cooler];

// Dotted guide the parts hang from, as many tiny subpaths.
const GUIDE = Array.from({ length: 36 }, (_, i) => `M${CX} ${62 + i * 6} v2`).join(" ");

// Exploded computer: low-poly isometric layers that drop onto a guide and draw themselves,
// bottom to top, every time the figure scrolls into view.
export default function ExplodedFigure({ caption = "Fig 1.", captionAbove = false, aspect = "aspect-[285/460]", className = "" }) {
  const figRef = useRef(null);

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

      tl.from(fig.querySelector("[data-guide]"), { strokeDashoffset: len, duration: 0.6, ease: "power1.out" });
      fig.querySelectorAll("[data-part]").forEach((part) => {
        tl.from(part, { y: -22, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
        tl.from(part.querySelectorAll("path"), { strokeDashoffset: len, duration: 0.5, stagger: 0.05 }, "<");
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
          viewBox="30 48 140 270"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          role="img"
          aria-label="Exploded view of a computer: case base, power supply, graphics card, motherboard with RAM and CPU, and CPU cooler"
        >
          <path data-guide d={GUIDE} strokeWidth="1" />
          {PARTS.map((paths, i) => (
            // Paper-coloured fill so each layer hides the lines of the layers beneath it.
            <g key={i} data-part style={{ fill: "var(--color-paper)" }}>
              {paths.map((d, j) => (
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
