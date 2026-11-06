import { history } from "../data.js";
import Lead from "./Lead.jsx";
import Section from "./Section.jsx";

export default function History() {
  return (
    <Section id="history" title="HISTORY" em={5} side="left" dot>
      <Lead letter="F" body={history.body}>{history.lead}</Lead>

      <div className="mt-20 grid gap-16 pb-24 md:grid-cols-[470px_1fr] md:gap-x-24">
        <ul className="m-0 list-none p-0">
          {history.jobs.map((j) => (
            <li key={j.company} className="flex items-end justify-between border-b border-ink/10 py-5 first:pt-0">
              <div>
                <h3 className="font-display text-2xl font-bold">{j.company}</h3>
                <p className="text-xl">{j.role}</p>
              </div>
              <span className="text-sm">{j.dates}</span>
            </li>
          ))}
        </ul>

        <div className="md:mt-24">
          <h3 className="mb-4 font-display text-4xl font-bold">Clients</h3>
          <p className="max-w-[480px] text-xl leading-relaxed">{history.clientsIntro}</p>
          <ul className="m-0 mt-12 grid max-w-[480px] list-none grid-cols-3 gap-y-16 p-0">
            {history.clients.map((c) => (
              // Placeholder wordmarks. Replace with <img> logos.
              <li key={c} className="flex h-[100px] items-center text-lg font-black tracking-tight">{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
