import { Suspense, useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Renders `children` only once the placeholder is near the viewport, and keeps it mounted after that.
// Pair it with React.lazy children so the component's code is also downloaded on demand.
// `minHeight` reserves space so the scrollbar and layout stay roughly stable before it mounts.
export default function LazyMount({ children, minHeight = "100vh", rootMargin = "300px 0px" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  // Real content changes the page height, so let ScrollTrigger recalculate its start points.
  useEffect(() => {
    if (show) requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [show]);

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
    </div>
  );
}
