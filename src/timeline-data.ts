export interface TimelineEntry {
  year: number
  image: string
  title: string
  caption: string
}

// Add new entries here — drop the image in public/images/timeline/ and add a row below.
// The timeline renderer will create storybook cards in the same format as the prepano section.
export const timeline: TimelineEntry[] = [
  // {
  //   year: 2018,
  //   image: '2018.jpg',
  //   title: 'The Year It All Started',
  //   caption: 'Write your caption here...',
  // },
  // {
  //   year: 2019,
  //   image: '2019.jpg',
  //   title: '',
  //   caption: '',
  // },
  // ... add one per year through 2026
]
