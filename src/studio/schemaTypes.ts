// Schema for the embedded Studio at /studio (CHER-17).
// Mirrors the deployed schema for project glm8iz92 (post, blockContent, author, category).
// Only labels, field order and grouping differ — the stored data shape is identical.
import {defineArrayMember, defineField, defineType} from 'sanity'

const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [{title: 'URL', name: 'href', type: 'url'}],
          },
        ],
      },
    }),
    defineArrayMember({type: 'image', options: {hotspot: true}}),
  ],
})

const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  groups: [
    {name: 'post', title: 'Post', default: true},
    {name: 'details', title: 'Details (optional)'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'post',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Goes live on',
      type: 'datetime',
      group: 'post',
      description:
        'The post appears on the website on this date once you tap Approve. Change it if you want a different day.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Header image',
      type: 'image',
      group: 'post',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Image description',
          type: 'string',
          description: 'A few words describing the picture (for screen readers and Google).',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Post',
      type: 'blockContent',
      group: 'post',
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'details',
      description: '1–2 sentences shown in the blog list. Leave blank to use the first paragraph.',
    }),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      group: 'details',
      description: 'Made from the title. Only change this before the post goes live.',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'details',
      to: {type: 'author'},
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'details',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'mainImage', publishedAt: 'publishedAt'},
    prepare({title, media, publishedAt}) {
      const d = publishedAt ? new Date(publishedAt) : null
      const when = d
        ? d.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})
        : 'No date set'
      return {title, media, subtitle: when}
    },
  },
})

const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name', maxLength: 96}}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [defineArrayMember({type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: []})],
    }),
  ],
  preview: {select: {title: 'name', media: 'image'}},
})

const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
  ],
})

export const schemaTypes = [post, author, category, blockContent]
