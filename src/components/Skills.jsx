import { skills } from "../data.js";
import Figure from "./Figure.jsx";
import Lead from "./Lead.jsx";
import Section from "./Section.jsx";

export default function Skills() {
  return (
    <Section id="skills" title="SKILLS" em={4} side="right">
      <Lead letter="D" body={skills.body}>{skills.lead}</Lead>

      <div className="mt-16 grid items-start gap-12 md:grid-cols-[375px_375px] md:gap-x-16">
        {skills.columns.map((col, i) => (
          <div key={col.title} className={i === 1 ? "md:mt-[-2rem]" : ""}>
            <Figure caption={col.fig} captionAbove aspect="aspect-[375/410]" />
            <h3 className="mt-5 mb-4 font-display text-3xl font-bold">{col.title}</h3>
            <div className="space-y-4 text-xl leading-relaxed">
              {col.paragraphs.map((p) => <p key={p}>{p}</p>)}
              <p>
                <a href={col.link.href} className="font-bold underline">{col.link.label}</a>
                {col.link.after}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
