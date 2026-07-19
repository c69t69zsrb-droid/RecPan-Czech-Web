import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import generateSitemapPlugin from './vite-sitemap-plugin.js'
import generatePrerenderPlugin from './vite-prerender-plugin.js'

// Build-time guard: the Base44 App ID must be provided as VITE_BASE44_APP_ID.
// Without it the SDK initializes with appId=null, producing broken API paths
// like /api/apps/null/functions/... — so fail the build loudly instead.
const BASE44_APP_ID = process.env.VITE_BASE44_APP_ID;
if (!BASE44_APP_ID || BASE44_APP_ID === 'null') {
  throw new Error(
    '\n[RecPan] Missing required environment variable VITE_BASE44_APP_ID.\n' +
    'Add it in Vercel (Project → Settings → Environment Variables) with the\n' +
    'real Base44 App ID (found in Base44 Studio), then trigger a new deploy.\n'
  );
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
    generateSitemapPlugin(),
    generatePrerenderPlugin(),
  ]
});