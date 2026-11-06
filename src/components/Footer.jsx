import { monogram, nav } from "../data.js";

export default function Footer() {
  return (
    <footer id="contact">
      {/* double rule */}
      <div className="border-t border-ink pt-0.5">
        <div className="border-t border-ink" />
      </div>

      <div className="mx-auto flex max-w-7xl items-start justify-between px-6 py-24 md:px-12">
        <a href="#top" className="font-display text-3xl leading-none font-black tracking-tighter" aria-label="Back to top">
          {monogram}
        </a>
        <nav className="flex gap-6 text-xl font-bold">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="hover:underline">{n.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
