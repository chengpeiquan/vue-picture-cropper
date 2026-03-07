import { execSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const smokeRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(smokeRoot, '..')
const consumerRoot = path.resolve(smokeRoot, 'consumer')
const artifactsRoot = path.resolve(smokeRoot, '.artifacts')
const manifestPath = path.resolve(artifactsRoot, 'package-path.txt')

mkdirSync(artifactsRoot, { recursive: true })

execSync('pnpm build:lib', {
  cwd: repoRoot,
  stdio: 'inherit',
})

const before = new Set(
  readdirSync(repoRoot).filter((name) => name.endsWith('.tgz')),
)

execSync('pnpm pack', {
  cwd: repoRoot,
  stdio: 'inherit',
})

const after = readdirSync(repoRoot).filter((name) => name.endsWith('.tgz'))
const tarballName = after.find((name) => !before.has(name))

if (!tarballName) {
  throw new Error('Failed to locate the generated package tarball')
}

const sourceTarball = path.resolve(repoRoot, tarballName)
const targetTarball = path.resolve(artifactsRoot, tarballName)

rmSync(targetTarball, { force: true })
execSync(`mv "${sourceTarball}" "${targetTarball}"`, {
  cwd: repoRoot,
  stdio: 'ignore',
})

const installedPackagePath = path.resolve(
  consumerRoot,
  'node_modules/vue-picture-cropper',
)

if (existsSync(installedPackagePath)) {
  rmSync(installedPackagePath, { recursive: true, force: true })
}

execSync(`pnpm add "${targetTarball}"`, {
  cwd: consumerRoot,
  stdio: 'inherit',
})

writeFileSync(manifestPath, `${targetTarball}\n`)
