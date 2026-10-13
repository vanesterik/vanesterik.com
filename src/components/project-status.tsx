import type { Status } from '@/lib/projects'

const DOT_COLORS: Record<Status, string> = {
  live: 'text-info',
  wip: 'text-warning',
  archived: 'text-muted-foreground',
}

type ProjectStatusProps = {
  status: Status
}

/**
 * A project's status as a colored dot and its label; the label always shows,
 * so color is never the only signal
 */
export const ProjectStatus = ({ status }: ProjectStatusProps) => (
  <span className="inline-flex items-baseline gap-1.5">
    <span aria-hidden="true" className={DOT_COLORS[status]}>
      ●
    </span>
    {status}
  </span>
)
