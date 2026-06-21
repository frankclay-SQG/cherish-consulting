import { createClient } from '@sanity/client'

const config = {
  projectId: '38bty9n4',
  dataset: 'cherich',
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
}

/** CDN-backed client for public reads (fast) */
export const sanityClient = createClient({
  ...config,
  useCdn: true,
})

/** Write / admin client — bypasses CDN for real-time data and mutations */
export const sanityAdminClient = createClient({
  ...config,
  useCdn: false,
})
