import './styles/main.css'
import { initAuth } from './auth'
import { renderStoryPages } from './story-renderer'
import { initNavAccordion } from './nav-accordion'
import { initScrollSpy } from './scroll-spy'
import { initTimeCapsuleCarousels } from './time-capsule'

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    setTimeout(() => document.body.classList.remove('is-loading'), 100)
  })

  initAuth(() => {
    renderStoryPages()
    initNavAccordion()
    initScrollSpy()
    initTimeCapsuleCarousels()
  })
})
