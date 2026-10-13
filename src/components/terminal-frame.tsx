import { cn } from 'cn'

import { withBasePath } from '@/lib/base-path'
import type { TerminalLine, Tone } from '@/lib/projects'

const TONE_COLORS: Record<Tone, string> = {
  command: 'text-foreground',
  info: 'text-muted-foreground',
  warn: 'text-warning',
  success: 'text-success',
}

// A scripted session as lines, or a screenshot of a terminal app
type TerminalFrameProps = { name: string } & (
  | { lines: TerminalLine[] }
  | { image: string; alt: string }
)

/**
 * A terminal window showing what a tool does: a scripted session, or a
 * screenshot of a terminal app. The dark class gives everything inside the
 * dark theme's tokens, so it stays dark and its colors stay readable in the
 * light theme too
 */
export const TerminalFrame = (props: TerminalFrameProps) => (
  <figure className="dark flex min-h-55 flex-col gap-3 rounded-md bg-secondary p-4 font-mono text-[13px] text-foreground leading-relaxed">
    <figcaption className="text-muted-foreground">
      zsh — {props.name}
    </figcaption>
    {'image' in props ? (
      // biome-ignore lint/performance/noImgElement: the static export has no image optimizer, so next/image adds nothing
      <img
        src={withBasePath(props.image)}
        alt={props.alt}
        loading="lazy"
        className="aspect-[16/10] w-full rounded-sm object-cover"
      />
    ) : (
      <pre className="whitespace-pre-wrap font-mono">
        {props.lines.map(({ text, tone }, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: the lines are static and never reorder
          <span key={index} className={cn('block', TONE_COLORS[tone])}>
            {tone === 'command' ? `$ ${text}` : text}
          </span>
        ))}
        <span className="block">
          ${' '}
          <span
            aria-hidden="true"
            className="inline-block h-[1.1em] w-[0.6em] translate-y-[0.15em] bg-foreground"
          />
        </span>
      </pre>
    )}
  </figure>
)
