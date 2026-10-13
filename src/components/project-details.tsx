import { getLinkTargetProps } from '@/components/link-list'
import type { Project, ProjectType } from '@/lib/projects'

const PRIMARY_LABELS: Record<ProjectType, string> = {
  web: 'visit site',
  cli: 'install',
  lib: 'npm',
}

type ProjectDetailsProps = {
  project: Project
}

/**
 * A project's description, facts and links, in columns that stack when
 * narrow. Stack and year are here too, as narrow tables hide their columns
 */
export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const { type, description, stack, role, year, links } = project
  const items = [
    { label: PRIMARY_LABELS[type], url: links.primary },
    { label: 'source', url: links.source },
    { label: 'write-up', url: links.writeup },
  ].filter((item): item is { label: string; url: string } => Boolean(item.url))

  return (
    <div className="flex flex-wrap gap-8">
      <p className="flex-[2_1_16rem]">{description}</p>
      <dl className="grid flex-[1_1_12rem] grid-cols-[72px_1fr] content-start gap-x-2">
        <dt className="text-muted-foreground">stack</dt>
        <dd>{stack.join(' · ')}</dd>
        <dt className="text-muted-foreground">role</dt>
        <dd>{role}</dd>
        <dt className="text-muted-foreground">year</dt>
        <dd>{year}</dd>
      </dl>
      {items.length > 0 && (
        <ul className="flex flex-[1_1_10rem] flex-wrap content-start gap-x-4">
          {items.map(({ label, url }) => (
            <li key={label}>
              <a
                className="hover:text-highlight"
                href={url}
                {...getLinkTargetProps(url)}
              >
                <span aria-hidden="true">→ </span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
