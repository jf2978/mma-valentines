export function initNavAccordion(): void {
  const toggles = document.querySelectorAll<HTMLButtonElement>('.nav-group-toggle')

  toggles.forEach((toggle) => {
    const links = toggle.nextElementSibling as HTMLElement | null
    if (!links) return

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true'
      toggle.setAttribute('aria-expanded', String(!isExpanded))
      links.classList.toggle('collapsed', isExpanded)
    })
  })
}

export function expandGroupForSection(sectionId: string): void {
  const link = document.querySelector<HTMLAnchorElement>(
    `#sidebar nav a[href="${sectionId}"]`
  )
  if (!link) return

  const group = link.closest('.nav-group')
  if (!group) return

  const toggle = group.querySelector<HTMLButtonElement>('.nav-group-toggle')
  const links = group.querySelector<HTMLElement>('.nav-group-links')
  if (!toggle || !links) return

  toggle.setAttribute('aria-expanded', 'true')
  links.classList.remove('collapsed')
}
