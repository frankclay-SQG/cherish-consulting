# Cherich Consulting — Studio

The blog is edited at **https://cherich.sanity.studio** (project `glm8iz92`, dataset `production`).

That Studio is hosted by Sanity directly from a deployed schema — there is no local Studio
project to build. The schema it runs is the four types below; `schemaTypes/` holds the
`post` and `blockContent` definitions, and `author` and `category` are:

- `author` — name, slug (from name), image, bio (plain paragraphs)
- `category` — title, description

## Changing the schema

Edit the files here, then redeploy with the Sanity connector (`deploy_schema` for project
`glm8iz92`, workspace `default`, followed by `deploy_studio` with app host `cherich`).

## History

Until October 24, 2026, cherich.sanity.studio pointed at an old `cherich` dataset inside the
Software Quality Guru Blog project (`38bty9n4`) — a June copy of this content left over from
before the blog moved to its own project. That Studio app was retired; the old dataset was
left in place untouched.

## Simplified review Studio at /studio (CHER-17, Nov 2026)

Carol reviews and approves posts at **https://www.cherishconsulting.com/studio** (footer "Admin" link).
It is a Sanity Studio embedded in the website (`src/studio/`), lazy-loaded, signed in with
her Sanity account. It opens to three lists: *Waiting for your approval* (drafts),
*Approved — going live soon*, and *Live on the website*. "Publish" is labeled **Approve**.
Authors and categories sit under *More*. If you change the schema here, mirror it in
`src/studio/schemaTypes.ts`.
