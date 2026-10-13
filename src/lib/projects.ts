import projects from '@/content/projects.json'

export const PROJECT_TYPES = ['web', 'cli', 'lib'] as const
export const STATUSES = ['live', 'wip', 'archived'] as const
export const TONES = ['command', 'info', 'warn', 'success'] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]
export type Status = (typeof STATUSES)[number]
export type Tone = (typeof TONES)[number]

export type TerminalLine = {
  text: string
  tone: Tone
}

export type Project = {
  slug: string
  type: ProjectType
  name: string
  stack: string[]
  year: number
  status: Status
  role: string
  description: string
  url?: string
  preview: {
    image?: string
    terminal?: TerminalLine[]
    video?: string
    recording?: string
  }
  links: {
    primary?: string
    source?: string
    writeup?: string
  }
}

type Raw = Record<string, unknown>

const isRecord = (value: unknown): value is Raw =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const fail = (where: string, message: string): never => {
  throw new Error(`content/projects.json: ${where}: ${message}`)
}

const readString = (raw: Raw, field: string, where: string) => {
  const value = raw[field]
  if (typeof value !== 'string' || !value) {
    return fail(where, `"${field}" must be a non-empty string`)
  }
  return value
}

const readOptionalString = (raw: Raw, field: string, where: string) =>
  raw[field] === undefined ? undefined : readString(raw, field, where)

const readOneOf = <T extends string>(
  raw: Raw,
  field: string,
  values: readonly T[],
  where: string,
) => {
  const value = raw[field]
  if (!values.includes(value as T)) {
    return fail(where, `"${field}" must be one of ${values.join(', ')}`)
  }
  return value as T
}

const readRecord = (raw: Raw, field: string, where: string) => {
  const value = raw[field] ?? {}
  if (!isRecord(value)) return fail(where, `"${field}" must be an object`)
  return value
}

const readTerminal = (preview: Raw, where: string) => {
  const lines = preview.terminal
  if (lines === undefined) return undefined
  if (!Array.isArray(lines)) return fail(where, '"terminal" must be a list')

  return lines.map((line) => {
    if (!isRecord(line)) return fail(where, 'a terminal line must be an object')
    return {
      text: readString(line, 'text', where),
      tone: readOneOf(line, 'tone', TONES, where),
    }
  })
}

const readProject = (raw: unknown, index: number): Project => {
  const position = `project ${index + 1}`
  if (!isRecord(raw)) return fail(position, 'must be an object')

  // Name the project by its slug where it has one
  const where = typeof raw.slug === 'string' && raw.slug ? raw.slug : position
  const { stack, year } = raw

  if (
    !Array.isArray(stack) ||
    !stack.length ||
    !stack.every((item) => typeof item === 'string' && item)
  ) {
    fail(where, '"stack" must be a list of non-empty strings')
  }
  if (typeof year !== 'number' || !Number.isInteger(year)) {
    fail(where, '"year" must be a whole number')
  }

  const preview = readRecord(raw, 'preview', where)
  const links = readRecord(raw, 'links', where)

  return {
    slug: readString(raw, 'slug', where),
    type: readOneOf(raw, 'type', PROJECT_TYPES, where),
    name: readString(raw, 'name', where),
    stack: stack as string[],
    year: year as number,
    status: readOneOf(raw, 'status', STATUSES, where),
    role: readString(raw, 'role', where),
    description: readString(raw, 'description', where),
    url: readOptionalString(raw, 'url', where),
    preview: {
      image: readOptionalString(preview, 'image', where),
      terminal: readTerminal(preview, where),
      video: readOptionalString(preview, 'video', where),
      recording: readOptionalString(preview, 'recording', where),
    },
    links: {
      primary: readOptionalString(links, 'primary', where),
      source: readOptionalString(links, 'source', where),
      writeup: readOptionalString(links, 'writeup', where),
    },
  }
}

/**
 * Get the projects in content/projects.json, checked and newest first: by
 * year, keeping the file's order within a year. A project with a missing or
 * unknown value fails the build, named by its slug.
 */
export const getProjects = (items: unknown = projects): Project[] => {
  if (!Array.isArray(items)) {
    return fail('the file', 'must hold a list of projects')
  }

  const result = items.map(readProject)
  const slugs = new Set<string>()
  for (const { slug } of result) {
    if (slugs.has(slug)) fail(slug, 'the slug is used twice')
    slugs.add(slug)
  }

  // Array sort is stable, so projects of one year keep the file's order
  return [...result].sort((a, b) => b.year - a.year)
}
