import { projects } from "../data.js";
import Lead from "./Lead.jsx";
import Section from "./Section.jsx";

export default function Projects() {
  return (
    <Section id="projects" title="Projects." em={5.1} side="right" dot>
      <Lead letter="E" body={projects.body}>{projects.lead}</Lead>

      <div className="mt-6 max-w-[640px] pb-32">
        {projects.posts.map((post) => (
          <article key={post.title} className="border-t border-ink/10 pt-10">
            <h3 className="font-display text-4xl font-bold">{post.title}</h3>
            <p className="mt-8 text-xl leading-relaxed text-ink/40">
              {post.excerpt}{" "}
              <a href={post.href} className="font-bold underline">Read full post</a>.
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
