import './styles/main.css'
import { initScrollSpy } from './scroll-spy'
import { initPrepanoToggle } from './prepano-toggle'
import { initSlideshow } from './slideshow'
import { initTimeline } from './timeline'

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    setTimeout(() => document.body.classList.remove('is-loading'), 100)
  })

  initScrollSpy()
  initPrepanoToggle()
  initSlideshow()
  initTimeline()
})
