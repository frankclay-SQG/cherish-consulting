import { createClient } from '@sanity/client'

const config = {
  projectId: 'glm8iz92',
  dataset: 'production',
  apiVersion: '2024-01-01',
}

/** CDN-backed client for public reads (fast). The dataset is public, so no token is sent. */
export const sanityClient = createClient({
  ...config,
  useCdn: true,
})
