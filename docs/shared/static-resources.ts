import { withBase } from 'vitepress'

const withExampleImages = (filename: string) => {
  return withBase(`/example-images/${filename}`)
}

export const exampleImages = {
  friedRice: withExampleImages('fried-rice.jpg'),
  riceNoodles: withExampleImages('rice-noodles.jpg'),
}

export const controllableCropperSizeRange = {
  min: 50,
  max: 600,
} as const
