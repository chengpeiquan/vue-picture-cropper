import { writeFileSync } from '@withtypes/fs-extra'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { generateDtsBundle } from 'dts-bundle-generator'

async function run() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const rootPath = resolve(__dirname, '..')
  const options = [
    {
      filePath: resolve(rootPath, `./src/index.tsx`),
      output: {
        noBanner: true,
      },
    },
  ]

  const declarations = generateDtsBundle(options, {
    preferredConfigPath: resolve(rootPath, `./tsconfig.json`),
  })
  if (!Array.isArray(declarations) || !declarations.length) return

  const dts = [
    '/* eslint-disable no-undef */',
    '/* eslint-disable no-unused-vars */',
    '/* eslint-disable prettier/prettier */',
    `${declarations[0]}`,
  ].join('\n')
  const output = resolve(rootPath, `./lib/index.d.ts`)
  writeFileSync(output, dts)
}
run().catch((e) => {
  console.log(e)
})
