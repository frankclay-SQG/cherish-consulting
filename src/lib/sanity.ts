import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'glm8iz92',   // replace with your ID from sanity.io/manage
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
