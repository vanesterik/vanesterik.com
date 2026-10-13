import { cn } from 'cn'

import type { TerminalLine, Tone } from '@/lib/projects'

const TONE_COLORS: Record<Tone, string> = {
  command: 'text-foreground',
  info: 'text-muted-foreground',
  warn: 'text-warning',
  success: 'text-success',
}

type TerminalFrameProps = {
  name: string
  lines: TerminalLine[]
}

/**
 * A scripted terminal session, as a still of what a CLI or library does. The
 * dark class gives everything inside the dark theme's tokens, so it stays dark
 * and its colors stay readable in the light theme too
 */
export const TerminalFrame = ({ name, lines }: TerminalFrameProps) => (
  <figure className="dark flex min-h-55 flex-col gap-3 rounded-md bg-secondary p-4 font-mono text-[13px] text-foreground leading-relaxed">
    <figcaption className="text-muted-foreground">zsh — {name}</figcaption>
    <pre className="whitespace-pre-wrap font-mono">
      {lines.map(({ text, tone }, index) => (
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
  </figure>
)
