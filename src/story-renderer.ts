import { timeline } from './timeline-data'
import type { TimelineEntry } from './timeline-data'

const BG_COLORS = [
  'var(--color-accent-purple)',
  'var(--color-blue-purple)',
  'var(--color-magenta)',
]

function entryId(entry: TimelineEntry): string {
  return `story-${entry.year}-${entry.date}`
}

function formatDate(date: string): string {
  const [month, day, year] = date.split('-')
  const d = new Date(Number(year), Number(month) - 1, Number(day))
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function navLabel(entry: TimelineEntry): string {
  const [month] = entry.date.split('-')
  const d = new Date(2000, Number(month) - 1)
  return d.toLocaleDateString('en-US', { month: 'long' })
}

function createPageSection(entry: TimelineEntry, colorIndex: number): HTMLElement {
  const section = document.createElement('section')
  section.id = entryId(entry)
  section.className = 'wrapper fullscreen story-page'

  const isSingleImage = entry.images.length === 1

  if (isSingleImage) {
    section.style.backgroundImage = `url('${entry.images[0]}')`
    section.style.backgroundSize = 'cover'
    section.style.backgroundPosition = 'center'
    section.style.backgroundRepeat = 'no-repeat'
  } else {
    section.style.backgroundColor = BG_COLORS[colorIndex % BG_COLORS.length]
  }

  const caption = document.createElement('span')
  caption.className = 'bg-caption'
  caption.textContent = formatDate(entry.date)
  section.appendChild(caption)

  const inner = document.createElement('div')
  inner.className = 'inner'

  const title = document.createElement('h2')
  title.textContent = entry.title
  inner.appendChild(title)

  const desc = document.createElement('p')
  desc.textContent = entry.caption
  inner.appendChild(desc)

  if (!isSingleImage) {
    const cols = entry.images.length <= 2 ? 2 : entry.images.length <= 4 ? 2 : 3
    const gallery = document.createElement('div')
    gallery.className = `story-gallery story-gallery--cols-${cols}`

    for (const src of entry.images) {
      const imgEl = document.createElement('img')
      imgEl.src = src
      imgEl.alt = entry.title
      imgEl.loading = 'lazy'
      gallery.appendChild(imgEl)
    }

    inner.appendChild(gallery)
  }

  section.appendChild(inner)
  return section
}

function createNavGroup(year: number, entries: TimelineEntry[]): HTMLLIElement {
  const li = document.createElement('li')
  li.className = 'nav-group'

  const toggle = document.createElement('button')
  toggle.className = 'nav-group-toggle'
  toggle.setAttribute('aria-expanded', 'false')

  const span = document.createElement('span')
  span.textContent = String(year)
  toggle.appendChild(span)

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.classList.add('nav-chevron')
  svg.setAttribute('viewBox', '0 0 10 6')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'currentColor')
  svg.setAttribute('stroke-width', '1.5')
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
  polyline.setAttribute('points', '1,1 5,5 9,1')
  svg.appendChild(polyline)
  toggle.appendChild(svg)

  li.appendChild(toggle)

  const ul = document.createElement('ul')
  ul.className = 'nav-group-links collapsed'

  for (const entry of entries) {
    const pageLi = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#${entryId(entry)}`
    a.textContent = navLabel(entry)
    pageLi.appendChild(a)
    ul.appendChild(pageLi)
  }

  li.appendChild(ul)
  return li
}

export function renderStoryPages(): void {
  if (timeline.length === 0) return

  const closingSection = document.querySelector('#closing')
  if (!closingSection) return

  const navList = document.querySelector('#sidebar nav > ul')
  const closingNavLink = navList ? navList.children[navList.children.length - 1] : null

  // Group entries by year
  const yearGroups = new Map<number, TimelineEntry[]>()
  for (const entry of timeline) {
    const group = yearGroups.get(entry.year) ?? []
    group.push(entry)
    yearGroups.set(entry.year, group)
  }

  let colorIndex = 0

  for (const [year, entries] of yearGroups) {
    for (const entry of entries) {
      const section = createPageSection(entry, colorIndex)
      closingSection.parentElement?.insertBefore(section, closingSection)
      colorIndex++
    }

    if (navList && closingNavLink) {
      const navGroup = createNavGroup(year, entries)
      navList.insertBefore(navGroup, closingNavLink)
    }
  }
}
