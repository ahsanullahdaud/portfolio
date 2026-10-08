import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import { Card } from "../Card";
import { CardLabel } from "../CardLabel";
import { Chip } from "../Chip";

type ProjectCardProps = {
  project: Project;
  label: string;
  /** Title size: 28px for project 02, 24px for project 03 (PLAN.md §8.3). */
  titleSize: "28" | "24";
  className?: string;
};

const titleClass = {
  "28": "text-title-28",
  "24": "text-title-24",
} as const;

/** Projects 02 and 03: label, title, description, stack chips, plus a muted "private client" chip when the client is private. */
export function ProjectCard({ project, label, titleSize, className }: ProjectCardProps) {
  return (
    <Card contain={false} id={project.id} as="article" className={className}>
      <CardLabel>{label}</CardLabel>
      <div className="flex flex-col gap-2.5">
        <h2 className={`font-display ${titleClass[titleSize]} font-bold text-fg`}>{project.name}</h2>
        {project.description && (
          <p className="font-sans text-sm leading-snug text-fg-2">{project.description}</p>
        )}
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
          {project.note && (
            <li>
              <Chip muted>{ui.labels.privateClient}</Chip>
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
}
