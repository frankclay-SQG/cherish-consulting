import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated from the title — click Generate.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary / Excerpt',
      type: 'text',
      rows: 3,
      description:
        'A short 1–2 sentence summary shown in post listings. Leave blank to auto-generate from the first paragraph.',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Header Image',
      type: 'image',
      description: 'The banner / hero image shown at the top of the post.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      description:
        'Set to a future date/time to schedule this post. Leave blank to keep as draft.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {author, publishedAt} = selection
      const now = new Date()
      const pubDate = publishedAt ? new Date(publishedAt) : null
      const status = !pubDate
        ? '✏️ Draft'
        : pubDate > now
          ? '🕐 Scheduled'
          : '✅ Published'
      return {
        ...selection,
        subtitle: [author && `by ${author}`, status].filter(Boolean).join(' · '),
      }
    },
  },
})
