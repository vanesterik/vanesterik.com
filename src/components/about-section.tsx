import { cn } from 'cn'
import type { ReactNode } from 'react'

type AboutSectionProps = {
  title: string
  // The section's <li> elements
  children: ReactNode
  // Set the items small and muted, like the posts list's descriptions,
  // instead of at the large item size
  isCompact?: boolean
}

export const AboutSection = ({
  title,
  children,
  isCompact = false,
}: AboutSectionProps) => (
  <section className="mt-[6.5em] text-intro">
    <h2>{title}</h2>
    {/* The list's em values are in the heading's size, whatever size the
        items are. Its indent is the footer's, so the two line up */}
    <ul
      className={cn(
        'mt-[1em] flex flex-col pl-indent',
        isCompact
          ? 'gap-1 *:text-base *:text-muted-foreground'
          : 'gap-[1em] *:text-item',
      )}
    >
      {children}
    </ul>
  </section>
)
