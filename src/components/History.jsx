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
            <li key={j.company} className="border-b border-ink/10 py-5 first:pt-0">
              <h3 className="font-display text-2xl font-bold">{j.company}</h3>
              {/* Timeline: a vertical line with a dot per role, newest at the top */}
              <ol className="m-0 mt-3 list-none border-l-2 border-ink p-0 pl-6">
                {j.roles.map((r) => (
                  <li key={r.role} className="relative flex items-end justify-between pb-4 last:pb-0">
                    <span className="absolute top-2 -left-[31px] size-3 rounded-full border-2 border-ink bg-paper" />
                    <p className="text-xl">{r.role}</p>
                    <span className="text-sm">{r.dates}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>

        <div className="md:mt-24">
          <h3 className="mb-4 font-display text-4xl font-bold">{history.educationTitle}</h3>
          <p className="max-w-[480px] text-xl leading-relaxed">{history.educationIntro}</p>
          <ul className="m-0 mt-12 max-w-[480px] list-none p-0">
            {history.education.map((e) => (
              <li key={e.school} className="flex items-end justify-between border-b border-ink/10 py-5 first:pt-0">
                <div>
                  <h4 className="font-display text-2xl font-bold">{e.school}</h4>
                  <p className="text-xl">{e.detail}</p>
                </div>
                <span className="text-sm">{e.dates}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
