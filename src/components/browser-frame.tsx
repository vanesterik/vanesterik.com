import { withBasePath } from '@/lib/base-path'

type BrowserFrameProps = {
  url?: string
  image: string
  alt: string
}

/**
 * A website's screenshot in a browser window, with its address in the top bar.
 * The screenshot is a path under public/, so it gets the base path the site
 * (or Storybook) is served under, which a plain <img> doesn't add by itself
 */
export const BrowserFrame = ({ url, image, alt }: BrowserFrameProps) => (
  <figure className="overflow-hidden rounded-md border border-accent">
    <div className="flex items-center gap-1.5 border-accent border-b px-3 py-2">
      <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
      <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
      <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
      {url && (
        <span className="ml-2 truncate text-muted-foreground text-xs">
          {url.replace(/^https?:\/\//, '')}
        </span>
      )}
    </div>
    {/* biome-ignore lint/performance/noImgElement: the static export has no image optimizer, so next/image adds nothing */}
    <img
      src={withBasePath(image)}
      alt={alt}
      loading="lazy"
      className="aspect-[16/10] w-full object-cover"
    />
  </figure>
)
