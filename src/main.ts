import './styles/main.css'
import { renderStoryPages } from './story-renderer'
import { initNavAccordion } from './nav-accordion'
import { initScrollSpy } from './scroll-spy'
import { initPrepanoToggle } from './prepano-toggle'
import { initSlideshow } from './slideshow'

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    setTimeout(() => document.body.classList.remove('is-loading'), 100)
  })

  renderStoryPages()
  initNavAccordion()
  initScrollSpy()
  initPrepanoToggle()
  initSlideshow()
})
