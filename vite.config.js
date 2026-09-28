import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import chatEmailPlugin from './server/chat-email.mjs'

export default defineConfig(({ mode }) => ({
  plugins: [react(), chatEmailPlugin({...loadEnv(mode, process.cwd(), ''), ...process.env})],
}))
