import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Single-line drawing: a rose bud on a long stem, rising out of a looped heart that sits on a
// gentle wave. Drawn as two continuous pen strokes, in the order they are listed.
const STROKES = [
  // Wave from the left, up the right side of the heart, the little loop at the cusp, round the
  // left lobe, through the crossing at the point, and out along the wave to the right.
  [
    "M-40 806",
    "C80 740 200 690 290 688",
    "C420 686 560 720 700 742",
    "C800 756 900 752 965 712",
    "C1060 650 1150 580 1185 480",
    "C1215 390 1170 318 1095 316",
    "C1040 315 1005 345 995 380",
    "C985 410 970 470 992 488",
    "C1015 500 1025 455 1015 420",
    "C1005 380 975 340 940 325",
    "C900 312 840 320 815 370",
    "C790 420 800 510 840 580",
    "C880 650 940 700 1000 718",
    "C1060 735 1150 718 1260 702",
    "C1420 680 1600 650 1720 662",
    "C1820 672 1890 710 1960 746",
  ].join(" "),

  // Stem from below the heart up to the bloom, then the petals: lower right, lower left, the
  // cup and top-left petal, the spiral of the bud, the right petal and the front lip of the cup.
  [
    "M1020 755",
    "C975 700 925 620 908 520",
    "C895 430 905 360 925 315",
    "C935 292 943 280 952 268",
    // lower right petal
    "C985 238 1040 192 1095 186",
    "C1140 182 1148 228 1125 252",
    "C1098 280 1035 294 985 290",
    "C965 288 954 280 950 270",
    // lower left petal
    "C915 262 860 252 818 246",
    "C784 241 770 214 778 190",
    "C788 160 828 141 865 148",
    "C905 156 945 185 962 220",
    "C970 238 962 256 948 266",
    // cup and top-left petal
    "C905 230 872 195 866 150",
    "C845 120 822 75 830 46",
    "C838 18 878 14 905 30",
    // spiral bud
    "C925 45 935 70 960 80",
    "C1000 95 1055 88 1062 55",
    "C1068 22 1030 2 995 6",
    "C958 10 936 38 946 60",
    "C956 80 992 84 1015 70",
    "C1034 58 1030 32 1006 30",
    "C986 29 976 46 990 56",
    // right petal, down the side of the cup, then the front lip curling back across it
    "C1010 68 1045 62 1078 50",
    "C1110 40 1130 66 1122 96",
    "C1116 124 1100 150 1072 172",
    "C1040 196 975 192 925 172",
    "C900 162 884 152 875 136",
  ].join(" "),
];

// Pen speed in viewBox units per second, so long strokes take proportionally longer.
const SPEED = 950;

// Rose line drawing that draws itself, pen-style, every time it scrolls into view.
export default function RoseFigure({ caption = "Fig 1.", captionAbove = false, aspect = "aspect-[285/460]", className = "" }) {
  const figRef = useRef(null);

  useLayoutEffect(() => {
    const fig = figRef.current;
    if (!fig || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const paths = [...fig.querySelectorAll("svg path")];
      const len = (i, el) => el.getTotalLength();
      gsap.set(paths, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({
        delay: 0.3,
        scrollTrigger: {
          trigger: fig,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "restart reset restart reset",
        },
      });

      paths.forEach((p, i) => {
        const duration = p.getTotalLength() / SPEED;
        tl.to(p, { strokeDashoffset: 0, duration, ease: "power1.inOut" }, i ? "-=0.5" : 0);
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
          viewBox="730 -20 500 830"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          role="img"
          aria-label="Single-line drawing of a rose bud on a long stem rising out of a looped heart above a gentle wave"
        >
          {STROKES.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </svg>
      </div>
      {!captionAbove && cap}
    </figure>
  );
}
