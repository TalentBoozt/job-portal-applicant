import('@angular/compiler');
const esbuild = require('esbuild');
require('dotenv').config();

esbuild.build({
  entryPoints: ['./server.ts'], // Entry point for your server
  bundle: true, // Bundle all dependencies
  platform: 'node', // Target Node.js
  outfile: 'dist/server.bundle.mjs', // Output file
  format: 'esm', // Output as an ES module
  target: 'node18', // Target Node.js 18
  external: ['@angular/platform-server'], // Externalize Angular platform-server
  loader: {
    '.ts': 'ts', // Use the TypeScript loader
  },
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.env.NG_APP_FIREBASE_API_KEY':`"${process.env.FIREBASE_API_KEY}"`,
    'process.env.NG_APP_FIREBASE_AUTH_DOMAIN':`"${process.env.FIREBASE_AUTH_DOMAIN}"`,
    'process.env.NG_APP_FIREBASE_PROJECT_ID':`"${process.env.FIREBASE_PROJECT_ID}"`,
    'process.env.NG_APP_FIREBASE_STORAGE_BUCKET':`"${process.env.FIREBASE_STORAGE_BUCKET}"`,
    'process.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID':`"${process.env.FIREBASE_MESSAGING_SENDER_ID}"`,
    'process.env.NG_APP_FIREBASE_APP_ID':`"${process.env.FIREBASE_APP_ID}"`,
    'process.env.NG_APP_FIREBASE_MEASUREMENT_ID':`"${process.env.FIREBASE_MEASUREMENT_ID}"`,
    'process.env.NG_APP_STRIPE_KEY':`"${process.env.STRIPE_KEY}"`,
    'process.env.NG_APP_API_URL':`"${process.env.API_URL}"`,
    'process.env.NG_APP_API_URL_SIMPLE':`"${process.env.API_URL_SIMPLE}"`,
    'process.env.NG_APP_FACEBOOK_APP_ID':`"${process.env.FACEBOOK_APP_ID}"`,
    'process.env.NG_APP_GOOGLE_ISSUER':`"${process.env.GOOGLE_ISSUER}"`,
    'process.env.NG_APP_GOOGLE_CLIENT_ID':`"${process.env.GOOGLE_CLIENT_ID}"`,
    'process.env.NG_APP_GOOGLE_REDIRECT_URI':`"${process.env.GOOGLE_REDIRECT_URI}"`,
    'process.env.NG_APP_GOOGLE_SCOPE':`"${process.env.GOOGLE_SCOPE}"`,
    'process.env.NG_APP_GOOGLE_SECRET':`"${process.env.GOOGLE_SECRET}"`,
    'process.env.NG_APP_GOOGLE_RESPONSE_TYPE':`"${process.env.GOOGLE_RESPONSE_TYPE}"`,
    'process.env.NG_APP_GOOGLE_STRICT_DISCOVERY':`"${process.env.GOOGLE_STRICT_DISCOVERY}"`,
    'process.env.NG_APP_GOOGLE_SHOW_DEBUG':`"${process.env.GOOGLE_SHOW_DEBUG}"`,
    'process.env.NG_APP_GOOGLE_REQUIRE_HTTPS':`"${process.env.GOOGLE_REQUIRE_HTTPS}"`,
    'process.env.NG_APP_GOOGLE_ALLOW_HTTP':`"${process.env.GOOGLE_ALLOW_HTTP}"`,
    'process.env.NG_APP_GOOGLE_OIDC':`"${process.env.GOOGLE_OIDC}"`,
    'process.env.NG_APP_GITHUB_CLIENT_ID':`"${process.env.GITHUB_CLIENT_ID}"`,
    'process.env.NG_APP_LINKEDIN_CLIENT_ID':`"${process.env.LINKEDIN_CLIENT_ID}"`,
    'process.env.NG_APP_LINKEDIN_REDIRECT_URI':`"${process.env.LINKEDIN_REDIRECT_URI}"`,
  },
  inject: ['./polyfills.js'],
}).then(() => {
  console.log('Server bundle built successfully!');
}).catch(() => process.exit(1));
