import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// When the app is exported to Vercel/a custom domain, the SDK must send
// API requests to the Base44 backend instead of using relative URLs (which
// would hit the Vercel server and 404). On the Base44-hosted domain we keep
// relative URLs for same-origin efficiency.
// In production builds, functionsVersion is undefined so the SDK does NOT
// send the Base44-Functions-Version header (which causes 404s on the
// hosted domain when the preview function version isn't deployed).
const isBase44Hosted =
  typeof window !== 'undefined' &&
  typeof window.location?.hostname === 'string' &&
  window.location.hostname.endsWith('.base44.app');

export const base44 = createClient({
  appId,
  token,
  functionsVersion: import.meta.env.DEV ? functionsVersion : undefined,
  serverUrl: isBase44Hosted ? '' : 'https://base44.app',
  requiresAuth: false,
  appBaseUrl
});