export const PAGE_REGISTERED = 'PAGE_REGISTERED'
export const pageRegistered = (name, href, time = new Date().getTime()) => ({
  type: PAGE_REGISTERED,
  name,
  href,
  time,
})

export const PAGE_REQUESTED = 'PAGE_REQUESTED'
export const pageRequested = (name, time = new Date().getTime()) => ({
  type: PAGE_REQUESTED,
  name,
  time,
})

export const PAGE_LOADED = 'PAGE_LOADED'
export const pageLoaded = (name, time = new Date().getTime()) => ({
  type: PAGE_LOADED,
  name,
  time,
})

export const PAGE_RENDERED = 'PAGE_RENDERED'
export const pageRendered = (name, time = new Date().getTime()) => ({
  type: PAGE_RENDERED,
  name,
  time,
})
