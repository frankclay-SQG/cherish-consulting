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

/** Write / admin client — bypasses CDN for real-time data and mutations */
export const sanityAdminClient = createClient({
  ...config,
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: false,
})
