import type { Metadata } from 'next'

import { ProjectIndex } from '@/components/project-index'
import { getProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
}

export default function Page() {
  return (
    <div className="md:mr-[10%] md:ml-[45%]">
      {/* Nothing visible precedes the table, so the heading is only for
          screen readers */}
      <h1 className="sr-only">Projects</h1>
      <ProjectIndex projects={getProjects()} />
    </div>
  )
}
