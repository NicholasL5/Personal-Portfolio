import { profile, nav } from "../data.js";

export default function Header() {
  return (
    <header className="flex items-start justify-between pt-10">
      <a className="flex flex-col leading-none" href="#top">
        <span className="font-display text-5xl font-black tracking-tighter">{profile.name}</span>
        <span className="ml-5 -mt-1 text-lg font-bold">{profile.title}</span>
      </a>
      <nav className="flex gap-12 pt-3 text-2xl font-bold">
        {nav.map((n) => (
          <a key={n.label} href={n.href} className="hover:underline">{n.label}</a>
        ))}
      </nav>
    </header>
  );
}
