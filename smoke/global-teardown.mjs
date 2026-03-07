import { readFileSync, rmSync } from 'node:fs'

const PID_FILE = '/tmp/vue-picture-cropper-smoke-vite.pid'

export default function globalTeardown() {
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
    // Server already stopped or never started.
  }

  rmSync(PID_FILE, { force: true })
}
