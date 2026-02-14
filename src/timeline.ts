import { timeline } from './timeline-data'

export function initTimeline(): void {
  const container = document.getElementById('timeline-cards')
  if (!container) return
  if (timeline.length === 0) return

  timeline.forEach((entry) => {
    const card = document.createElement('div')
    card.className = 'pic'

    const primaryImage = entry.images[0]
    card.innerHTML = `
      <img src="${primaryImage}" class="pic-image" alt="${entry.title}">
      <span class="pic-caption top-to-bottom">
        <h1 class="pic-title">${entry.year} — ${entry.title}</h1>
        <p>${entry.caption}</p>
      </span>
    `

    container.appendChild(card)
  })
}
