/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/typing/',
  // A zone west of UTC, so local-day vs UTC-day bugs show up even on a UTC CI runner
  test: { env: { TZ: 'America/New_York' } },
})
