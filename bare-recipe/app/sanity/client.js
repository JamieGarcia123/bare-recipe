import { createClient } from '@sanity/client'
import imageUrlBuilder, { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'jvie9x8w',
  dataset: 'production',
  apiVersion: '2025-10-16',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source).url();
}

// export function urlForGallery(source) {
//   return builder.image(source).url();
// }

export function safeImageUrl(source) {
  if (!source) return null;

  // already a URL (defensive)
  if (typeof source === 'string') return source;

  // sanity image object
  if (source.asset) {
    try {
      return builder.image(source).url();
    } catch {
      return null;
    }
  }

  return null;
}
