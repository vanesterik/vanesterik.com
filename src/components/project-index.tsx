'use client'

import { cn } from 'cn'

import { BrowserFrame } from '@/components/browser-frame'
import { ProjectDetails } from '@/components/project-details'
import { ProjectStatus } from '@/components/project-status'
import { TerminalFrame } from '@/components/terminal-frame'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Project } from '@/lib/projects'

// Name, type, year and the status dot; narrow enough for a phone as well
const COLUMNS = 'grid grid-cols-[1fr_3rem_3rem_1rem] gap-x-4'

const ProjectPreview = ({ project }: { project: Project }) => {
  const { type, name, url, preview } = project

  if (type === 'web' && preview.image) {
    return (
      <BrowserFrame
        url={url}
        image={preview.image}
        alt={`Screenshot of ${name}`}
      />
    )
  }
  if (type !== 'web' && preview.terminal) {
    return <TerminalFrame name={name} lines={preview.terminal} />
  }
  return null
}

type ProjectIndexProps = {
  projects: Project[]
}

/**
 * The projects as an ls -l style table, without borders or a header: one row
 * per project, which opens to a preview and details. One row is open at a time
 */
export const ProjectIndex = ({ projects }: ProjectIndexProps) => (
  <div className="font-mono">
    <Accordion type="single" collapsible>
      {projects.map((project) => (
        <AccordionItem key={project.slug} value={project.slug}>
          <AccordionTrigger
            className={cn(
              COLUMNS,
              // The header and footer's text style, rounded and padded like
              // their buttons
              'min-h-11 items-baseline rounded px-2 py-3.5 text-xs uppercase hover:bg-secondary',
            )}
          >
            <span>{project.name}</span>
            <span className="text-muted-foreground">{project.type}</span>
            <span>{project.year}</span>
            <span className="justify-self-end">
              <ProjectStatus status={project.status} />
            </span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-8 pt-2 pb-8">
            <ProjectPreview project={project} />
            <ProjectDetails project={project} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
)
