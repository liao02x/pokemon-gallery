import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"
// import { ViteAliases } from 'vite-aliases'

const getCache = ({ name, pattern }) => ({
  urlPattern: pattern,
  handler: "CacheFirst",
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 1500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2 // 2 years
    },
    cacheableResponse: {
      statuses: [200]
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    // ViteAliases({ prefix: "" }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          getCache({ 
            pattern: /^https:\/\/cdn\..*\/.*\.png/, 
            name: "cdn-images" 
          }),
        ],
      },
      devOptions: {
        enabled: true
      }
    }),
  ],
})
