import { expandGroupForSection } from './nav-accordion'

export function initScrollSpy(): void {
  const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>(
    '#sidebar nav a[href^="#"]'
  )
  const sections = Array.from(sidebarLinks)
    .map((link) => {
      const id = link.getAttribute('href')
      return id ? document.querySelector<HTMLElement>(id) : null
    })
    .filter((s): s is HTMLElement => s !== null)

  let activeLock: string | null = null

  function activateLink(href: string): void {
    sidebarLinks.forEach((l) => l.classList.remove('active'))
    const activeLink = document.querySelector<HTMLAnchorElement>(
      `#sidebar nav a[href="${href}"]`
    )
    activeLink?.classList.add('active')
    expandGroupForSection(href)
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      const href = link.getAttribute('href')
      if (!href) return

      activateLink(href)
      activeLock = href

      const target = document.querySelector<HTMLElement>(href)
      target?.scrollIntoView({ behavior: 'smooth' })

      setTimeout(() => {
        activeLock = null
      }, 1200)
    })
  })

  const observer = new IntersectionObserver(
    (entries) => {
      if (activeLock) return
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activateLink('#' + entry.target.id)
        }
      })
    },
    {
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0,
    }
  )

  sections.forEach((section) => {
    observer.observe(section)
  })

  // Activate first link by default
  if (sidebarLinks.length > 0) {
    sidebarLinks[0].classList.add('active')
  }
}
