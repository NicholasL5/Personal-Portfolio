// Section with a giant title and a vertical rail ("Learn More" + a rule, optionally ending in a dot).
// side="right": rail on the right edge. side="left": rail on the left edge.
// `em` is the title's approximate width in em, used to size it to fit the container.
export default function Section({ id, title, em, side = "right", dot = false, children }) {
  const right = side === "right";
  return (
    <section id={id} className="relative mt-32 [container-type:inline-size]">
      <div
        aria-hidden={false}
        className={`absolute inset-y-0 hidden w-6 flex-col items-center md:flex ${right ? "right-0" : "left-0"}`}
      >
        <a href={`#${id}`} className="pt-2 text-xl font-bold [writing-mode:vertical-rl]">
          Learn More
        </a>
        <div className="mt-4 w-px flex-1 bg-ink" />
        {dot && <span className="-mt-1 size-2 rounded-full bg-ink" />}
      </div>

      <div className={right ? "md:pr-16" : "md:pl-16"}>
        <h2
          className={`m-0 font-display leading-none font-black tracking-tight ${right ? "text-left" : "text-right"}`}
          style={{ fontSize: `max(4rem, calc((100cqw - 4rem) / ${em}))` }}
        >
          {title}
        </h2>
      </div>

      <div className="mt-16 md:px-24">{children}</div>
    </section>
  );
}
