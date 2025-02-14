const path = require('path');
const fs = require('fs');

// Get environment variables from process.env (set by Vercel)
const environment = {
  production: true,
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY'] || 'default-firebase-api-key',
    authDomain: process.env['FIREBASE_AUTH_DOMAIN'] || 'default-auth-domain',
    projectId: process.env['FIREBASE_PROJECT_ID'] || 'default-project-id',
    storageBucket: process.env['FIREBASE_STORAGE_BUCKET'] || 'default-storage-bucket',
    messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'] || 'default-sender-id',
    appId: process.env['FIREBASE_APP_ID'] || 'default-app-id',
    measurementId: process.env['FIREBASE_MEASUREMENT_ID'] || 'default-measurement-id',
  },
  stripe_key: process.env['STRIPE_KEY'] || 'default-stripe-key',
  apiUrl: process.env['API_URL'] || 'default-api-url',
  apiUrlSimple: process.env['API_URL_SIMPLE'] || 'default-api-url-simple',
  facebookAuthConfig: {
    appId: process.env['FACEBOOK_APP_ID'] || 'default-facebook-app-id',
  },
  googleAuthConfig: {
    issuer: process.env['GOOGLE_ISSUER'] || 'default-google-issuer',
    clientId: process.env['GOOGLE_CLIENT_ID'] || 'default-google-client-id',
    redirectUri: process.env['GOOGLE_REDIRECT_URI'] || 'default-google-redirect-uri',
    scope: process.env['GOOGLE_SCOPE'] || 'default-google-scope',
    secret: process.env['GOOGLE_SECRET'] || 'default-google-secret',
    responseType: process.env['GOOGLE_RESPONSE_TYPE'] || 'default-google-response-type',
    strictDiscoveryDocumentValidation: process.env['GOOGLE_STRICT_DISCOVERY'] || false,
    showDebugInformation: process.env['GOOGLE_SHOW_DEBUG'] || true,
    requireHttps: process.env['GOOGLE_REQUIRE_HTTPS'] || false,
    allowHttp: process.env['GOOGLE_ALLOW_HTTP'] || true,
    oidc: process.env['GOOGLE_OIDC'] || true
  },
  githubAuthConfig: {
    clientId: process.env['GITHUB_CLIENT_ID'] || 'default-github-client-id',
  },
  linkedinAuthConfig: {
    clientId: process.env['LINKEDIN_CLIENT_ID'] || 'default-linkedin-client-id',
    redirectUri: process.env['LINKEDIN_REDIRECT_URI'] || 'default-linkedin-redirect-uri',
  }
};

// Path to where the environment file should be created
const outputPath = path.join(__dirname, '../src/environments/environment.ts');

// Write the environment file with dynamic values
fs.writeFileSync(outputPath, `export const environment = ${JSON.stringify(environment, null, 2)};`, 'utf8');
console.log('Environment file generated!');
