import { createCarousel, isVideo } from './story-renderer'
import type { SlideCaption } from './story-renderer'

interface CapsuleSlide {
  src: string
  alt: string
  caption?: SlideCaption
}

const PREPANO_SLIDES: CapsuleSlide[] = [
  {
    src: '/images/time-capsule/groupme.png',
    alt: 'GroupMe conversation',
    caption: {
      title: '"Are you alive?"',
      text: "As a member of intern island, I had to find a source of entertainment in the office. With Maddie and Bernie quietly dying of boredom and Emmanuel concentrating for hours on end, I oftentimes ended up being pretty jealous of everyone at the long tables - with sexist-joke debates, and weird-but-obvious-flirting (don't worry I forgive you), I couldn't help but feel like I was missing out. On one particular day though, things weren't as lively as usual and as I looked over to the area, I didn't see the Pret bag, didn't hear the short heel sandals or incredibly noticeable laugh (sorry but it's true b) - you weren't there \u{1F615}. The office just wasn't the same without our intern leader and I eventually saw it as the perfect excuse to personally message you for once.",
    },
  },
  {
    src: '/images/time-capsule/philandfun.jpg',
    alt: 'Philosophy and Fun',
    caption: {
      title: 'Philosophy and Fun',
      text: "Reflecting on the breadth of our conversations - from the classic 'I swear I'm not that bougie' remarks and Greg shenanigans to the deeper intellectual debates about our philosophical values and beliefs - I'm not surprised that we do a pretty good job communicating today. While I was definitely just trying to find an excuse to talk to you in the beginning, I never really felt the need to think through each and every text or even hesitate to talk about difficult topics with you; I just wanted to talk to you as much as I could. Regardless of how long we had known each other, talking to you was (and continues to be) my favorite combination of comical and enlightening.",
    },
  },
  {
    src: '/images/time-capsule/points.png',
    alt: 'Points system',
    caption: {
      title: 'Do I get points for that?',
      text: "We may have started off with your points system (which was clearly rigged but okay), I like to believe that we were prety wholesome to begin with and that I wasn't just talking to you because you were cute and worked at ERA (though let's be real that was the intial reason). This picture serves as just a snippet into, what I like to call, our \"wow my heart\" moments, and as proof that I wasn't really in the game for the points - I meant every cheesy pickup line, wholesome comment and kinda-funny joke \u{1F618}.",
    },
  },
  {
    src: '/images/time-capsule/rob.jpg',
    alt: 'Rob',
    caption: {
      title: 'Sleeping Beauty',
      text: "Here's my favorite picture of Rob just because this layout looks better with it here \u{1F602}.",
    },
  },
  {
    src: '/images/time-capsule/no_pano.jpg',
    alt: 'Whether or not',
    caption: {
      title: 'Whether or Not Pano Happened',
      text: 'The closer we got to Panorama (and I was confident it was going to happen even though we didn\'t find out until the day before) the more I started thinking about \'us\' as a real possibility. I knew I wanted something real rather than some fling, but I couldn\'t help but be a little hesitant - "What if she strictly wants something short-term? How is it even going to work for like a month? Ugh long distance sucks anyway so maybe I\'m overexagerrating and should just say fuck it..." I told myself. Nevertheless, I don\'t think that pano was the only reason we happened, but only really served as one road to the same intersection. And even though I\'m usually awful with directions, you and I both knew what was going to happen after a certain point...',
    },
  },
]

const FINSTA_SLIDES: CapsuleSlide[] = [
  {
    src: '/images/time-capsule/finsta_1.jpg',
    alt: 'Finsta post 1',
    caption: {
      text: "\"I've spent so many years in hiding that I forgot how the whole butterflies in your stomach sensation felt until now (+3 pts), finally meditated and felt so at peace with myself (+2 pts), fast forward 20 minutes later where I literally got SIDE SPLASHED BY A CAR (-5 pts), my v wet day was immediately brightened by Janie's book recommendation\"",
    },
  },
  {
    src: '/images/time-capsule/finsta_2.jpg',
    alt: 'Finsta post 2',
    caption: {
      text: '"I realize now that this is the earliest I could\'ve done any of this, because it was only recently that I really started to prioritize self-love and allowed myself, and only myself, to dictate my self worth (not in a quantifiable sense, but in an intangible sense). In this way, the experience was more liberating..."',
    },
  },
  {
    src: '/images/time-capsule/finsta_3.jpg',
    alt: 'Finsta post 3',
    caption: {
      text: '"At some point in my hackathon frenzy, I looked up and saw the quote (pictured above) and slowly realized that being a "true intellectual" doesn\'t necessarily entail being perfect at everything that I do (a mentality ingrained by the lovely Fairfax County public schooling system), but rather to be brave and immerse myself in a state of constant inquiry, regardless of how "stupid" I may feel."',
    },
  },
  {
    src: '/images/time-capsule/finsta_4.jpg',
    alt: 'Finsta post 4',
    caption: {
      text: '"In the midst of weighing the pros and cons of my heart, I realized that as hard as I can try, I will never be able to micromanage the future and the only thing that I can be sure of is that I\'ll regret not acting on something that feels so //goddamn// right -- no matter whatever the fuck the success rate is."',
    },
  },
  {
    src: '/images/time-capsule/finsta_5.jpg',
    alt: 'Finsta post 5',
    caption: {
      text: '"...ended the night by telling my mom that I was in fact dating someone, and she literally sounded so relieved that I had to remind her that I was still a "strong, independent woman" and to not get that excited (ambiguous, but I do love my momma)."',
    },
  },
]

function initCarousel(
  containerId: string,
  slides: CapsuleSlide[],
): void {
  const container = document.getElementById(containerId)
  if (!container) return

  const bgOverlay = container.closest('.story-page')?.querySelector<HTMLElement>('.story-page-bg')
  const images = slides.map((s) => s.src)
  const captions = slides.map((s) => s.caption).filter((c): c is SlideCaption => !!c)

  const carousel = createCarousel(
    images,
    slides[0]?.alt ?? '',
    (src) => {
      if (bgOverlay && !isVideo(src)) {
        bgOverlay.style.backgroundImage = `url('${src}')`
      }
    },
    captions.length === slides.length ? captions : undefined,
  )

  container.appendChild(carousel)
}

export function initTimeCapsuleCarousels(): void {
  initCarousel('prepano-carousel', PREPANO_SLIDES)
  initCarousel('finsta-carousel', FINSTA_SLIDES)
}
