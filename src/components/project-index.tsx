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

// Narrow tables show type, name, status and the marker; from 32rem wide (the
// table's own width) they add stack and year
const COLUMNS =
  'grid grid-cols-[44px_1fr_84px_20px] gap-x-4 @lg:grid-cols-[56px_2fr_2fr_56px_96px_24px]'
const WIDE_ONLY = 'hidden @lg:block'

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
 * The projects as an ls -l style table: one row per project, which opens to a
 * preview and details. One row is open at a time
 */
export const ProjectIndex = ({ projects }: ProjectIndexProps) => (
  <div className="@container font-mono text-[15px] leading-[1.6]">
    {/* Each row's button reads out its own values */}
    <div
      aria-hidden="true"
      className={cn(
        COLUMNS,
        'items-baseline border-t border-t-foreground border-b border-b-accent py-2 text-muted-foreground text-xs',
      )}
    >
      <span>type</span>
      <span>name</span>
      <span className={WIDE_ONLY}>stack</span>
      <span className={WIDE_ONLY}>year</span>
      <span>status</span>
      <span />
    </div>
    <Accordion type="single" collapsible>
      {projects.map((project) => (
        <AccordionItem key={project.slug} value={project.slug}>
          <AccordionTrigger
            className={cn(
              COLUMNS,
              'group min-h-13 items-baseline py-3.5 hover:bg-secondary',
            )}
          >
            <span className="text-muted-foreground">{project.type}</span>
            <span>{project.name}</span>
            <span className={WIDE_ONLY}>{project.stack.join(' · ')}</span>
            <span className={WIDE_ONLY}>{project.year}</span>
            <ProjectStatus status={project.status} />
            <span
              aria-hidden="true"
              className="text-right text-muted-foreground before:content-['+'] group-data-[state=open]:before:content-['−']"
            />
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
