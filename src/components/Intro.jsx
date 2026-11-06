import { profile, external } from "../data.js";
import Figure from "./Figure.jsx";
import KeyLead from "./KeyLead.jsx";

export default function Intro() {
  return (
    <section
      id="top"
      className="mt-12 grid items-start gap-8 md:mt-24 md:grid-cols-[170px_285px_1fr] md:gap-x-10"
    >
      <aside>
        <h3 className="mb-4 text-2xl font-normal">External</h3>
        <ul className="m-0 list-none p-0">
          {external.map((e) => (
            <li key={e.label} className="mb-3.5 font-bold">
              <a href={e.href} target="_blank" rel="noreferrer" className="hover:underline">{e.label}</a>
            </li>
          ))}
        </ul>
      </aside>

      <Figure className="max-w-[285px]" />

      <KeyLead
        letter="W"
        className="self-center md:pl-10"
        body={
          <>
            {profile.bio}{" "}
            <a href={profile.company.href} className="font-bold underline">{profile.company.label}</a>.
          </>
        }
      >
        {profile.intro}{" "}
        <small className="text-[0.75em]">{profile.figRef}</small> {profile.introEnd}
      </KeyLead>
    </section>
  );
}
