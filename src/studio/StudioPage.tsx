// Embedded Sanity Studio at /studio (CHER-17). Lazy-loaded so the public site never downloads it.
import {useEffect} from 'react'
import {Studio} from 'sanity'
import config from './sanity.config'

export default function StudioPage() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = 'Blog review — Cherich Consulting'
    return () => {
      meta.remove()
      document.title = prevTitle
    }
  }, [])
  return (
    <div style={{height: '100dvh', maxHeight: '100dvh', overscrollBehavior: 'none'}}>
      <Studio config={config} />
    </div>
  )
}
