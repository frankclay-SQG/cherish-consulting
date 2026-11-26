// Simplified Studio for Dr. Cherich, served at /studio (CHER-17).
// Opens to the posts waiting for her approval; one "Approve" button publishes
// a post, and it goes live on its "Goes live on" date. Works on phone and desktop.
import {defineConfig, type DocumentActionComponent} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const API = '2024-01-01'

const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.listItem()
        .id('review')
        .title('Waiting for your approval')
        .icon(() => '📝')
        .child(
          S.documentList()
            .id('review-list')
            .title('Waiting for your approval')
            .apiVersion(API)
            .filter('_type == "post" && _id in path("drafts.**")')
            .defaultOrdering([{field: 'publishedAt', direction: 'asc'}])
            .menuItems([]),
        ),
      S.listItem()
        .id('scheduled')
        .title('Approved — going live soon')
        .icon(() => '🕐')
        .child(
          S.documentList()
            .id('scheduled-list')
            .title('Approved — going live soon')
            .apiVersion(API)
            .filter('_type == "post" && !(_id in path("drafts.**")) && publishedAt > now()')
            .defaultOrdering([{field: 'publishedAt', direction: 'asc'}])
            .menuItems([]),
        ),
      S.listItem()
        .id('live')
        .title('Live on the website')
        .icon(() => '✅')
        .child(
          S.documentList()
            .id('live-list')
            .title('Live on the website')
            .apiVersion(API)
            .filter('_type == "post" && !(_id in path("drafts.**")) && publishedAt <= now()')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
            .menuItems([]),
        ),
      S.divider(),
      S.listItem()
        .id('more')
        .title('More')
        .icon(() => '⚙️')
        .child(
          S.list()
            .title('More')
            .items([
              S.documentTypeListItem('post').title('All posts'),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('category').title('Categories'),
            ]),
        ),
    ])

// Rename "Publish" to "Approve" and keep the post action menu short.
function withApproveLabel(original: DocumentActionComponent): DocumentActionComponent {
  const Approve: DocumentActionComponent = (props) => {
    const result = original(props)
    return result ? {...result, label: 'Approve'} : result
  }
  Approve.action = original.action
  return Approve
}

export default defineConfig({
  name: 'cherich',
  title: 'Cherich Consulting — Blog',
  projectId: 'glm8iz92',
  dataset: 'production',
  basePath: '/studio',
  plugins: [structureTool({structure, title: 'Blog'})],
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => t.schemaType === 'post'),
  },
  document: {
    actions: (prev, ctx) => {
      if (ctx.schemaType !== 'post') return prev
      return prev
        .filter((a) => a.action !== 'duplicate')
        .map((a) => (a.action === 'publish' ? withApproveLabel(a) : a))
    },
    newDocumentOptions: (prev) => prev.filter((i) => i.templateId === 'post'),
  },
})
