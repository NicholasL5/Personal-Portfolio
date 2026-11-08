import { useRef } from "react";
import { skills } from "../data.js";
import useWordReveal from "../hooks/useWordReveal.js";
import Figure from "./Figure.jsx";
import CodeFigure from "./CodeFigure.jsx";
import DiagramFigure from "./DiagramFigure.jsx";
import Lead from "./Lead.jsx";
import Section from "./Section.jsx";

export default function Skills() {
  const ref = useRef(null);
  useWordReveal(ref);

  return (
    <Section id="skills" title="SKILLS." em={4} side="right">
      <Lead letter="D" body={skills.body}>{skills.lead}</Lead>

      <div ref={ref} className="mt-16 grid items-start gap-12 md:grid-cols-[375px_375px] md:gap-x-16">
        {skills.columns.map((col, i) => (
          <div key={col.title} className={i === 1 ? "md:mt-[-2rem]" : ""}>
            {col.code ? (
              <CodeFigure caption={col.fig} code={col.code} filename={col.filename} captionAbove aspect="aspect-[375/410]" />
            ) : col.diagram ? (
              <DiagramFigure variant={col.diagram} caption={col.fig} captionAbove aspect="aspect-[375/410]" />
            ) : (
              <Figure caption={col.fig} captionAbove aspect="aspect-[375/410]" />
            )}
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
