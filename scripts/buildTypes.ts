import { writeFileSync } from '@withtypes/fs-extra'
import { resolve } from 'path'
import { generateDtsBundle } from 'dts-bundle-generator'

async function run() {
  const rootPath = resolve(__dirname, '..')
  const options = [
    {
      filePath: resolve(rootPath, `./src/index.tsx`),
      output: {
        noBanner: true,
      },
    },
  ]

  const dtses = generateDtsBundle(options, {
    preferredConfigPath: resolve(rootPath, `./tsconfig.json`),
  })
  if (!Array.isArray(dtses) || !dtses.length) return

  const dts = [
    '/* eslint-disable no-undef */',
    '/* eslint-disable no-unused-vars */',
    '/* eslint-disable prettier/prettier */',
    `${dtses[0]}`,
  ].join('\n')
  const output = resolve(rootPath, `./lib/index.d.ts`)
  writeFileSync(output, dts)
}
run().catch((e) => {
  console.log(e)
})
