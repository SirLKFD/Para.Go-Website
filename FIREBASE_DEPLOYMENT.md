# Firebase Deployment Guide: Para.Go Website

This document provides step-by-step instructions on how to deploy the **Para.Go** TanStack Start website to **Firebase Hosting**.

Since this is a TanStack Start application powered by **Vinxi** and **Nitro**, you can deploy it in two ways depending on your architecture:

1. **Option A: Static Site Generation (SSG) / Static Hosting (Recommended)** — Generates fully optimized static HTML files at build time. This option is extremely fast, 100% free, and perfectly suited for the current marketing/informational layout.
2. **Option B: Firebase App Hosting (SSR)** — Next-generation serverless hosting that automatically builds, deploys, and runs the Node.js server to handle server-side rendering and dynamic server functions.

---

## Option A: Static Site Generation (SSG) deployment (Recommended)

This method prerenders all routes (like `/` and `/about`) at build time, outputting static files to `.output/public` which are then served from Firebase's CDN.

### Step 1: Enable Prerendering in `vite.config.ts`
Open `vite.config.ts` and add the `prerender` property inside the `tanstackStart` plugin config:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  publicDir: 'assets',
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(), 
    tailwindcss(), 
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true, // Discovers internal links and prerenders those pages
      }
    }), 
    viteReact()
  ],
})
```

### Step 2: Install Firebase Tools CLI
If you haven't installed the Firebase CLI yet, run the following in your terminal:
```bash
npm install -g firebase-tools
```

### Step 3: Login to Firebase
Authenticate with your Google/Firebase account:
```bash
firebase login
```

### Step 4: Initialize Firebase in the Project
Navigate to your website project directory (`Website/parago`) and initialize Firebase Hosting:
```bash
firebase init hosting
```
During the setup wizard:
1. Select **"Use an existing project"** or **"Create a new project"** (e.g. choose your `parago` Firebase project).
2. For **"What do you want to use as your public directory?"**, type:
   ```text
   .output/public
   ```
3. For **"Configure as a single-page app (rewrite all urls to /index.html)?"**, choose:
   ```text
   No
   ```
   *(We select "No" because prerendering already creates individual static `.html` routes like `/about.html` for clean `/about` paths, which is best for SEO).*
4. For **"Set up automatic builds and deploys with GitHub?"**, choose **Yes** or **No** depending on your workflow.

### Step 5: Build and Deploy
Whenever you make updates, build and deploy using:
```bash
# Generate the prerendered static assets
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

---

## Option B: Firebase App Hosting (Full SSR)

If you plan to use dynamic server functions that query database credentials on every page request, use Firebase's next-generation **App Hosting**.

Firebase App Hosting connects directly to your GitHub repository, detects your package settings, and spins up serverless resources to run the Vinxi/Nitro server.

### Step 1: Push your Code to GitHub
Ensure your local project repository is committed and pushed to a remote GitHub repository.

### Step 2: Create a Web App on Firebase Console
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select or create your Firebase Project.
3. In the left-hand navigation menu, click **App Hosting** (under the Build section).
4. Click **Get Started**.

### Step 3: Connect your GitHub Repo
1. Follow the wizard prompts to connect your GitHub account.
2. Select your `Para.Go-Repos` repository and the deployment branch (e.g., `main`).

### Step 4: Configure App Hosting
1. Firebase will prompt you to set your build settings. 
2. Because TanStack Start uses Nitro under the hood, Firebase App Hosting automatically recognizes it and configures the correct builds.
3. Complete the setup to deploy. Every time you push to your selected GitHub branch, Firebase will automatically trigger a build, spin up a serverless environment for SSR, and deploy it.

---

## Verification
After deploying:
* Verify the live URL to ensure all styles, images, and routes load correctly.
* Navigate to the homepage `/` and about page `/about` to ensure browser navigation is fully functional.
* Check that your SEO tags are correctly rendered in the source HTML using `Ctrl+U` in your browser.
