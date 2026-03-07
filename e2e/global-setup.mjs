import { execSync, spawn } from 'node:child_process'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = 41731
const PID_FILE = '/tmp/vue-picture-cropper-e2e-vite.pid'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function stopExistingServer() {
  try {
    const pid = Number.parseInt(readFileSync(PID_FILE, 'utf8'), 10)
    if (!Number.isNaN(pid)) {
      try {
        process.kill(-pid, 'SIGTERM')
      } catch {
        process.kill(pid, 'SIGTERM')
      }
    }
  } catch {
    // No previous server to stop.
  }

  rmSync(PID_FILE, { force: true })
}

export default async function globalSetup() {
  stopExistingServer()

  const child = spawn(
    'pnpm',
    [
      'exec',
      'vite',
      '--config',
      'e2e/vite.config.ts',
      '--host',
      '127.0.0.1',
      '--port',
      String(PORT),
    ],
    {
      cwd: repoRoot,
      detached: true,
      stdio: 'ignore',
    },
  )

  child.unref()
  writeFileSync(PID_FILE, String(child.pid))

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      execSync(`curl -sf http://127.0.0.1:${PORT}/ > /dev/null`, {
        cwd: repoRoot,
        stdio: 'ignore',
      })
      return
    } catch {
      await sleep(250)
    }
  }

  throw new Error(`Timed out waiting for the e2e Vite server on port ${PORT}`)
}
