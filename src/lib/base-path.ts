/**
 * Prefix a path under public/ with the base path the site (or Storybook) is
 * served under, which a plain <img> doesn't add by itself
 */
export const withBasePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
