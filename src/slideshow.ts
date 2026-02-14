const CAPTIONS: Record<number, string> = {
  1: '"I\'ve spent so many years in hiding that I forgot how the whole butterflies in your stomach sensation felt until now (+3 pts), finally meditated and felt so at peace with myself (+2 pts), fast forward 20 minutes later where I literally got SIDE SPLASHED BY A CAR (-5 pts), my v wet day was immediately brightened by Janie\'s book recommendation"',
  2: '"I realize now that this is the earliest I could\'ve done any of this, because it was only recently that I really started to prioritize self-love and allowed myself, and only myself, to dictate my self worth (not in a quantifiable sense, but in an intangible sense). In this way, the experience was more liberating..."',
  3: '"At some point in my hackathon frenzy, I looked up and saw the quote (pictured above) and slowly realized that being a \\"true intellectual\\" doesn\'t necessarily entail being perfect at everything that I do (a mentality ingrained by the lovely Fairfax County public schooling system), but rather to be brave and immerse myself in a state of constant inquiry, regardless of how \\"stupid\\" I may feel."',
  4: '"In the midst of weighing the pros and cons of my heart, I realized that as hard as I can try, I will never be able to micromanage the future and the only thing that I can be sure of is that I\'ll regret not acting on something that feels so //goddamn // right -- no matter whatever the fuck the success rate is."',
  5: '"...ended the night by telling my mom that I was in fact dating someone, and she literally sounded so relieved that I had to remind her that I was still a \\"strong, independent woman\\" and to not get that excited (ambiguous, but I do love my momma)."',
}

let slideIndex = 1

function showSlide(n: number): void {
  const slides = document.querySelectorAll<HTMLElement>('.mySlides')
  const caption = document.querySelector<HTMLElement>('.text')
  const thumbnails = document.querySelectorAll<HTMLElement>('.demo')

  if (slides.length === 0) return

  if (n > slides.length) slideIndex = 1
  if (n < 1) slideIndex = slides.length

  slides.forEach((s) => (s.style.display = 'none'))
  thumbnails.forEach((t) => t.classList.remove('w3-opacity-off'))

  slides[slideIndex - 1].style.display = 'block'
  if (caption && CAPTIONS[slideIndex]) {
    caption.textContent = CAPTIONS[slideIndex]
  }
  thumbnails[slideIndex - 1]?.classList.add('w3-opacity-off')
}

export function initSlideshow(): void {
  const thumbnails = document.querySelectorAll<HTMLElement>('.demo')
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      slideIndex = index + 1
      showSlide(slideIndex)
    })
  })

  showSlide(1)
}
