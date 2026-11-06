// Placeholder line-art illustration. Swap for your own SVG/image.
export default function Figure({ caption = "Fig 1.", captionAbove = false, aspect = "aspect-[285/460]", className = "" }) {
  const cap = <figcaption className="my-2 text-sm font-bold">{caption}</figcaption>;
  return (
    <figure className={`m-0 ${className}`}>
      {captionAbove && cap}
      <div className={`${aspect} border-2 border-ink p-6`}>
        <svg className="h-full w-full" viewBox="0 0 200 320" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M40 30 L120 10 L120 80 L40 100 Z" />
          <path d="M50 70 L130 50 L130 120 L50 140 Z" />
          <path d="M30 170 L110 150 L170 170 L90 195 Z" />
          <path d="M30 170 L30 185 L90 210 L90 195" />
          <path d="M90 210 L170 185 L170 170" />
          <path d="M40 235 L110 220 L150 232 L80 250 Z" />
          <path d="M60 280 L140 262 L160 270 L80 292 Z" />
        </svg>
      </div>
      {!captionAbove && cap}
    </figure>
  );
}
