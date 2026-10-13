'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Status } from '@/lib/projects'

const DOT_COLORS: Record<Status, string> = {
  live: 'text-success',
  wip: 'text-danger',
  archived: 'text-muted-foreground',
}

type ProjectStatusProps = {
  status: Status
}

/**
 * A project's status as a colored dot, with its label in a tooltip on hover
 * and in the text for screen readers, so color is never the only signal
 */
export const ProjectStatus = ({ status }: ProjectStatusProps) => (
  <TooltipProvider>
    <Tooltip>
      {/* A span, not Radix's default button: the dot sits inside a row's
          button, which can't hold another */}
      <TooltipTrigger asChild>
        <span aria-hidden="true" className={DOT_COLORS[status]}>
          ●
        </span>
      </TooltipTrigger>
      <TooltipContent>{status}</TooltipContent>
    </Tooltip>
    <span className="sr-only">{status}</span>
  </TooltipProvider>
)
