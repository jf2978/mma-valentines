export function initPrepanoToggle(): void {
  const toggle = document.getElementById('toggle') as HTMLInputElement | null
  if (!toggle) return

  const pics = document.querySelectorAll<HTMLElement>('#prepano .pic')

  toggle.addEventListener('change', () => {
    const opacity = toggle.checked ? '0' : '1'
    pics.forEach((pic) => {
      pic.style.transition = 'opacity 0.6s ease'
      pic.style.opacity = opacity
    })
  })
}
