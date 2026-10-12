import { useEffect, useState } from 'react'
import type { Page } from './types'

export type Route = {
  page: Page
  params: URLSearchParams
}

function readRoute(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [path, query = ''] = raw.split('?')
  // Menu is the landing page: the QR on a table always resolves here.
  const page: Page = path === 'about' ? 'about' : 'menu'
  return { page, params: new URLSearchParams(query) }
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    const onChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onChange)
    // Normalise a bare URL so the first page change has a hash to diff against.
    if (!window.location.hash) window.location.replace(`${window.location.pathname}#/menu`)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route.page])

  return route
}

export function routeHref(page: Page, params?: Record<string, string>): string {
  const query = params ? new URLSearchParams(params).toString() : ''
  return `#/${page}${query ? `?${query}` : ''}`
}