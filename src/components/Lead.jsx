// Bold intro paragraph with a boxed drop cap, followed by optional body copy.
export default function Lead({ letter, children, body, className = "" }) {
  return (
    <div className={`max-w-[640px] ${className}`}>
      <div className="flow-root">
        <span className="float-left mr-3.5 mb-1 grid size-[138px] place-items-center border-2 border-ink font-display text-7xl font-black shadow-[inset_-4px_-4px_0_-2px_var(--color-paper),inset_-6px_-6px_0_-2px_var(--color-ink)]">
          {letter}
        </span>
        <p className="m-0 text-[1.65rem] leading-snug font-bold">{children}</p>
      </div>
      {body && <p className="mt-6 text-xl leading-relaxed">{body}</p>}
    </div>
  );
}
