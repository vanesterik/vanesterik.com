# Projects index: an `ls -l` style list of projects

Status: approved in conversation on 2026-10-13, for story #73. Revised the same day, after a first look in the browser, for a more minimal table: no borders, no header row, fewer columns and the status in a tooltip.

## Purpose

`/projects/` shows "coming soon". Koen wants a project index that treats websites and technical work (CLIs, libraries) as equals. It's based on a design brief for a terminal-style page modelled on `ls -l` output: one dense, scannable table with one project per row. A row expands inline to a preview and details.

Success means:
- a visitor scans every project in seconds and opens any of them without leaving the page;
- websites and tools each get a fitting preview: a browser frame with a screenshot, or a terminal frame with a scripted session;
- the page works from a phone to a wide screen, in light and dark, by mouse, touch and keyboard;
- adding or changing a project is an edit to a content file, not to code.

## Scope

In scope:
- the index page, with placeholder projects;
- the browser and terminal preview frames, with static content;
- three new color tokens;
- marking the current page in the navigation, on every page.

Out of scope, for a later story:
- looping terminal recordings (VHS or asciinema) and scroll-capture videos. The content model has room for them (`preview.recording`, `preview.video`), but nothing renders them yet.
- Koen's real projects and screenshots. Placeholder lorem ipsum content stands in until he adds them.

### Changes from the brief

The brief asks to follow the site's own stack, fonts, colors and layout wherever they exist. These are the places where the design departs from it, or fills a gap it left:

| Topic | Brief | This design |
|---|---|---|
| Font | IBM Plex Mono 400/500/600 | NB International Pro Mono, the site's mono, which has one weight |
| Column | Centred, at most 960px wide | Centred, at most 640px wide, like the posts |
| Table look | Hairline borders, a header row, `+`/`−` markers, a `stack` column | No borders except the browser frame's, no header row, no markers; `stack` only in the details |
| Row text | 15px mono, lowercase | `text-xs` mono, uppercase, like the header and footer |
| Column order | type · name · stack · year · status | name · type · year · status dot |
| Status | A dot plus its label | The dot only, with the label in a tooltip on hover (and for screen readers) |
| Expanded panel | Preview and details side by side | The preview at full width; the description beneath it at full width in the `prose` style; then two columns of `<dl>` pairs |
| Status and terminal colors | Hex values from the mockup | New tokens with GitHub light and dark values, from the Shiki themes the code blocks already use |
| Links | Accent blue | The site's link style: the text color, `highlight` on hover |
| Terminal background | `#141414` in both themes | The `secondary` token of the dark theme in both themes, through a `dark` class on the frame |
| "loop" indicator | In the terminal's top line | Left out until recordings arrive |
| "open demo" link | For experiments | Left out: there is no experiment type |
| Current page in the nav | Marked | Marked with the button's `default` style (`primary`: black in light, white in dark) on every page |

## Decisions

| Topic | Decision |
|---|---|
| Content | `content/projects.json`, an array of projects, read by `src/lib/projects.ts`, which validates it at build time |
| Order | Newest first by `year`, then in file order |
| Expanding rows | shadcn/ui Accordion (Radix), `type="single"` and `collapsible`: one row open at a time, an open row closes when clicked |
| Rendering | The index is a client component (the Accordion). The frames, status and details render on the server or the client alike |
| Type | Rows in NB International Pro Mono, `text-xs`, uppercase; the description in the `prose` style (Lausanne); detail labels in `muted-foreground` |
| Colors | Tokens only. New: `info` (blue), `warning` (orange), `success` (green) |
| Images | Plain `<img>`, lazy-loaded, as the static export has no image optimizer |
| Current page | `NavLink`, a client component using `usePathname`, ignoring the trailing slash |
| Animation | None: rows open and close without a transition, and the terminal cursor doesn't blink |

## Content

### Model

Each project in `content/projects.json`:

| Field | Type | Notes |
|---|---|---|
| `slug` | string | Unique |
| `type` | `web` \| `cli` \| `lib` | Picks the preview frame and the primary link's label |
| `name` | string | |
| `stack` | string[] | Shown joined with ` · ` |
| `year` | number | |
| `status` | `live` \| `wip` \| `archived` | |
| `role` | string | For example `design + build`, `author`, `maintainer` |
| `description` | string | One sentence on the problem and what was built |
| `url` | string, optional | Shown in the browser frame's top bar |
| `preview.image` | string, optional | Path of the screenshot under `public/` |
| `preview.terminal` | `{ text, tone }[]`, optional | `tone` is `command`, `info`, `warn` or `success` |
| `preview.video` | string, optional | Later story; not rendered |
| `preview.recording` | string, optional | Later story; not rendered |
| `links` | `{ primary?, source?, writeup? }` | URLs; each link is shown only when present |

### Validation

`getProjects()` in `src/lib/projects.ts` imports `content/projects.json` and checks every project. It has no Node imports, so Storybook can use it too.

The build fails with an error naming the project's slug, or its position when the slug is missing, when:
- a required field is missing or of the wrong type;
- `type`, `status` or a terminal line's `tone` isn't one of its values;
- two projects share a slug.

A JSON import types those fields as plain strings; the validation is what narrows them to the exact values the components rely on. `getProjects()` returns the projects newest first by `year`, keeping the file's order within a year.

### Placeholder content

Six lorem ipsum projects covering every type and status, with years from 2019 to 2026:
- two `web`, each with the screenshot placeholder, a URL and links;
- two `cli` and two `lib`, each with a terminal session using all four tones;
- at least one project missing `source` or `writeup`, so a hidden link shows.

The screenshot placeholder is `public/projects/placeholder.svg`: a neutral 16:10 image that reads "screenshot", in the site's greys.

## Units

### `app/projects/page.tsx`

Server component that renders, in a centred column at most 640px wide (`mx-auto w-full max-w-160`), like the posts:
- `<h1 className="sr-only">Projects</h1>`, as nothing visible precedes the table;
- `<ProjectIndex projects={getProjects()} />`.

### `components/project-index.tsx`

Client component. It renders an Accordion with one item per project, inside a `TooltipProvider` for the status dots. There is no header row and there are no borders.

**Rows**
- The trigger is a full-width `<button>` with `aria-expanded` and `aria-controls` (from Radix), at least 44px tall, with its cells baseline-aligned.
- Text: NB International Pro Mono, `text-xs`, uppercase, as in the header and footer. Rounded (`rounded`) and padded (`px-2`) like the header's buttons, so the hover background and focus outline sit around the text.
- Cells, in a grid of `1fr 3rem 3rem 1rem` with a 16px gap:
  - `name`;
  - `type`, in `muted-foreground`;
  - `year`;
  - `ProjectStatus`, the dot, right-aligned.
- Hover: `bg-secondary`. Keyboard focus: a 2px `info` outline inset in the row.
- Keyboard: Tab reaches the rows, Enter and Space open or close them, and the arrow keys move between rows (Radix).
- The same columns fit a phone, so there is no narrow layout.

**Panel**
- The Accordion content, under its row in the same item, with about 8px of padding above and 32px below.
- The preview at full width: `BrowserFrame` for `web` with an image, `TerminalFrame` for `cli` and `lib` with a terminal session, and nothing when a project has neither.
- `ProjectDetails` beneath it.

### `components/project-status.tsx`

A `●` dot, `info` for `live`, `warning` for `wip` and `muted-foreground` for `archived`.
- Hovering the dot shows the status ("live", "wip" or "archived") in a tooltip (`ui/tooltip.tsx`, Radix), styled like the dropdown items: mono, uppercase, `text-xs`, on `secondary`.
- The label is also in the DOM as visually hidden text, so screen readers read it as part of the row, and color is never the only signal.
- Touch screens have no hover, so on phones the status is the dot's color only.

### `components/browser-frame.tsx`

```tsx
type BrowserFrameProps = { url?: string; image: string; alt: string }
```

- A 1px `accent` border with a 6px radius.
- A top bar with three small `muted-foreground` dots and the URL, without its protocol, in small grey text.
- The screenshot as `<img loading="lazy">` in a 16:10 box (`object-cover`), with the alt text "Screenshot of <name>".

### `components/terminal-frame.tsx`

```tsx
type TerminalFrameProps = { name: string; lines: { text: string; tone: Tone }[] }
```

- **Theme:** the `dark` class, so tokens inside take their dark values in both themes. The background is `secondary`, the text `foreground`.
- **Look:** 13px mono, a 6px radius, a minimum height of about 220px.
- **Top line:** `zsh — <name>`, in `muted-foreground`.
- **Lines:**
  - `command`: prefixed with `$ `, in `foreground`;
  - `info`: `muted-foreground`;
  - `warn`: `warning`;
  - `success`: `success`.
- **End:** a final `$ ` prompt with a block cursor that doesn't blink.

### `components/project-details.tsx`

Beneath the preview:
- the description at full width, in the `prose` style the posts use;
- beneath it, two columns of `<dl>` pairs in Lausanne regular at `text-sm`, one size below the description, which stack when narrow; labels in `muted-foreground`:
  - **left:** `stack` (joined with ` · `), `role` and `year`;
  - **right:** the links, each as a label and its address without the protocol, opened as the footer opens links (`getLinkTargetProps`):
    - the primary link: "visit site" for `web`, "install" for `cli`, "npm" for `lib`;
    - "source";
    - "write-up", a link to an article about the project;
    - each left out when it has no URL, and the column left out without any links.

### `components/ui/tooltip.tsx`

The shadcn/ui Tooltip (Radix), written by hand like the Accordion and restyled with the tokens: no arrow and no animation, mono uppercase `text-xs` on `secondary`, opening without a delay.

### Footer

`copyright` in `content/layout.json` drops "· MIT licensed". The `LICENSE` file stays.

### `components/ui/accordion.tsx`

Added with `npx shadcn@latest add accordion`, then restyled with the tokens. Its content has no open or close animation.

### `components/nav-link.tsx`

Client component wrapping the navigation's `Button` and `next/link`. It compares `usePathname()` with its URL, both without a trailing slash. On the current page it uses the `default` button variant and sets `aria-current="page"`. `Navigation` renders its links with it, and `MobileMenu` marks its current item the same way. The static export renders each page with its own path, so the marking is in the HTML from the start.

### Color tokens

Three new tokens in `src/app/globals.css`, each with a light and a dark value from the GitHub themes Shiki already uses for code blocks:

| Token | Light (`github-light`) | Dark (`github-dark`) | Used for |
|---|---|---|---|
| `info` | `#005cc5` (6.3:1 on white) | `#79b8ff` (10.1:1 on black) | `live` dot, focus outline |
| `warning` | `#e36209` (3.5:1) | `#ffab70` (11.3:1) | `wip` dot, terminal warnings |
| `success` | `#22863a` (4.6:1) | `#85e89d` (14:1) | terminal success lines |

The light `warning` is used only for the dot, a graphic that needs 3:1. Terminal text always uses the dark values. `src/stories/tokens.ts` lists the new tokens, which the Colors page and its sync test require.

## Testing

Vitest and Testing Library, next to each file:

- **`lib/projects.test.ts`:**
  - orders newest first, keeping the file's order within a year;
  - fails, naming the slug, on a missing field, an unknown `type`, `status` or `tone`, and a duplicate slug.
- **`project-index.test.tsx`:**
  - every row starts collapsed;
  - opening a row sets `aria-expanded` and shows its panel;
  - opening another row closes the first;
  - clicking an open row closes it;
  - each row reads its name, type, year and status, and shows the status in a tooltip on hovering the dot.
- **`project-status.test.tsx`:** the label for each status.
- **`browser-frame.test.tsx`:** the URL without its protocol, and the alt text.
- **`terminal-frame.test.tsx`:** the command prefix, a class per tone, and the final prompt.
- **`project-details.test.tsx`:** the primary link's label per type, and missing links left out.
- **`nav-link.test.tsx`:** `aria-current` on the current page only, with or without a trailing slash.

Storybook gets stories for `ProjectIndex`, `ProjectStatus`, `BrowserFrame`, `TerminalFrame`, `ProjectDetails`, the Accordion and the Tooltip.

In the browser:
- a wide screen, 768px and 375px (no sideways scroll), with the status tooltip on hovering a dot;
- both themes, including the terminal frame in the light theme;
- the keyboard: Tab, Enter and the arrow keys;
- the navigation's current page on every page.

## Documentation

`CLAUDE.md` adds:
- `content/projects.json` and `src/lib/projects.ts`;
- the new tokens;
- the new client components (`project-index`, `nav-link` and `ui/accordion`);
- the `dark`-class trick of the terminal frame.
