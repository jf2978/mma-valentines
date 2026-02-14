import { timeline } from './timeline-data'
import type { TimelineEntry } from './timeline-data'

type Season = 'Winter' | 'Spring' | 'Summer' | 'Fall'

interface SeasonInfo {
  season: Season
  order: number
}

interface SeasonGroup {
  year: number
  season: Season
  order: number
  images: string[]
  date: string
  title: string
  caption: string
}

function getSeasonInfo(date: string): SeasonInfo {
  const month = Number(date.split('-')[0])
  if (month <= 2) return { season: 'Winter', order: 0 }
  if (month <= 5) return { season: 'Spring', order: 1 }
  if (month <= 8) return { season: 'Summer', order: 2 }
  if (month <= 11) return { season: 'Fall', order: 3 }
  return { season: 'Winter', order: 4 }
}

function groupBySeason(entries: TimelineEntry[]): SeasonGroup[] {
  const yearGroups = new Map<number, TimelineEntry[]>()
  for (const entry of entries) {
    const group = yearGroups.get(entry.year) ?? []
    group.push(entry)
    yearGroups.set(entry.year, group)
  }

  const seasonGroups: SeasonGroup[] = []

  for (const [year, yearEntries] of yearGroups) {
    const orderMap = new Map<number, TimelineEntry[]>()
    for (const entry of yearEntries) {
      const info = getSeasonInfo(entry.date)
      const group = orderMap.get(info.order) ?? []
      group.push(entry)
      orderMap.set(info.order, group)
    }

    const orders = Array.from(orderMap.keys()).sort((a, b) => a - b)
    for (const order of orders) {
      const group = orderMap.get(order)!
      const info = getSeasonInfo(group[0].date)

      seasonGroups.push({
        year,
        season: info.season,
        order,
        images: group.flatMap((e) => e.images),
        date: group[0].date,
        title: group[0].title,
        caption: group[0].caption,
      })
    }
  }

  return seasonGroups
}

function groupId(group: SeasonGroup): string {
  const base = `story-${group.year}-${group.season.toLowerCase()}`
  return group.order === 4 ? `${base}-dec` : base
}

function navLabel(group: SeasonGroup, allGroups: SeasonGroup[]): string {
  const duplicates = allGroups.filter((g) => g.season === group.season)
  if (duplicates.length > 1) {
    const month = Number(group.date.split('-')[0])
    return new Date(2000, month - 1).toLocaleDateString('en-US', { month: 'long' })
  }
  return group.season
}

const SLIDE_PERCENT = 78
const GAP_PERCENT = 2.5

function createCarousel(
  images: string[],
  altText: string,
  onSlideChange?: (src: string) => void,
): HTMLElement {
  const carousel = document.createElement('div')
  carousel.className = 'story-carousel'

  const track = document.createElement('div')
  track.className = 'story-carousel-track'

  for (const src of images) {
    const slide = document.createElement('div')
    slide.className = 'story-carousel-slide'
    const img = document.createElement('img')
    img.src = src
    img.alt = altText
    img.loading = 'lazy'
    slide.appendChild(img)
    track.appendChild(slide)
  }

  carousel.appendChild(track)

  const prevBtn = document.createElement('button')
  prevBtn.className = 'story-carousel-prev'
  prevBtn.innerHTML = '&#8249;'
  prevBtn.type = 'button'
  carousel.appendChild(prevBtn)

  const nextBtn = document.createElement('button')
  nextBtn.className = 'story-carousel-next'
  nextBtn.innerHTML = '&#8250;'
  nextBtn.type = 'button'
  carousel.appendChild(nextBtn)

  const dots = document.createElement('div')
  dots.className = 'story-carousel-dots'
  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('button')
    dot.className = 'story-carousel-dot'
    dot.type = 'button'
    if (i === 0) dot.classList.add('active')
    dot.dataset.index = String(i)
    dots.appendChild(dot)
  }
  carousel.appendChild(dots)

  let currentIndex = 0
  const totalSlides = images.length
  const slides = track.querySelectorAll<HTMLElement>('.story-carousel-slide')

  function updateLayout() {
    const containerWidth = carousel.clientWidth
    if (containerWidth === 0) return

    const slideWidth = containerWidth * (SLIDE_PERCENT / 100)
    const gap = containerWidth * (GAP_PERCENT / 100)

    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`
      slide.style.marginRight = `${gap}px`
    })

    const centerOffset = (containerWidth - slideWidth) / 2
    const shift = currentIndex * (slideWidth + gap) - centerOffset
    track.style.transform = `translateX(${-shift}px)`
  }

  function goToSlide(index: number) {
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides
    updateLayout()
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex)
    })
    dots.querySelectorAll('.story-carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex)
    })
    onSlideChange?.(images[currentIndex])
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1))
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1))
  dots.querySelectorAll('.story-carousel-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      goToSlide(Number((dot as HTMLElement).dataset.index))
    })
  })

  const resizeObserver = new ResizeObserver(() => updateLayout())
  resizeObserver.observe(carousel)

  // Initial layout after DOM insertion
  slides[0]?.classList.add('active')
  requestAnimationFrame(() => updateLayout())

  return carousel
}

function createPageSection(group: SeasonGroup, isReversed: boolean): HTMLElement {
  const section = document.createElement('section')
  section.id = groupId(group)
  section.className = 'wrapper fullscreen story-page'
  if (isReversed) section.classList.add('story-page--reverse')

  const isSingleImage = group.images.length === 1

  const caption = document.createElement('span')
  caption.className = 'bg-caption'
  caption.textContent = `${group.season} ${group.year}`
  section.appendChild(caption)

  const bgOverlay = document.createElement('div')
  bgOverlay.className = 'story-page-bg'
  bgOverlay.style.backgroundImage = `url('${group.images[0]}')`
  section.appendChild(bgOverlay)

  const inner = document.createElement('div')
  inner.className = 'inner'

  const textCol = document.createElement('div')
  textCol.className = 'story-page-text'

  const title = document.createElement('h2')
  title.textContent = group.title
  textCol.appendChild(title)

  const desc = document.createElement('p')
  desc.textContent = group.caption
  textCol.appendChild(desc)

  const mediaCol = document.createElement('div')
  mediaCol.className = 'story-page-media'

  if (isSingleImage) {
    const img = document.createElement('img')
    img.src = group.images[0]
    img.alt = group.title
    img.loading = 'lazy'
    img.className = 'story-page-single-img'
    mediaCol.appendChild(img)
  } else {
    const carousel = createCarousel(group.images, group.title, (src) => {
      bgOverlay.style.backgroundImage = `url('${src}')`
    })
    mediaCol.appendChild(carousel)
  }

  inner.appendChild(textCol)
  inner.appendChild(mediaCol)
  section.appendChild(inner)
  return section
}

function createNavGroup(year: number, groups: SeasonGroup[]): HTMLLIElement {
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

  for (const group of groups) {
    const pageLi = document.createElement('li')
    const a = document.createElement('a')
    a.href = `#${groupId(group)}`
    a.textContent = navLabel(group, groups)
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

  const seasonGroups = groupBySeason(timeline)

  const yearNavGroups = new Map<number, SeasonGroup[]>()

  seasonGroups.forEach((group, index) => {
    const isReversed = index % 2 === 1
    const section = createPageSection(group, isReversed)
    closingSection.parentElement?.insertBefore(section, closingSection)

    const arr = yearNavGroups.get(group.year) ?? []
    arr.push(group)
    yearNavGroups.set(group.year, arr)
  })

  for (const [year, groups] of yearNavGroups) {
    if (navList && closingNavLink) {
      const navGroup = createNavGroup(year, groups)
      navList.insertBefore(navGroup, closingNavLink)
    }
  }
}
