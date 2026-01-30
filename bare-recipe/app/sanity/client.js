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
  return builder.image(source);
}