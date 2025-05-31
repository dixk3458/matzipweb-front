import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';

export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: ['/', '/signin', '/signup'],
      renderer: '@prerenderer/renderer-puppeteer',
      server: {
        port: 3000,
        host: 'localhost',
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTim: 500,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, 'https:')
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            'https://dm3lc0kermpza.cloudfront.net/'
          );
      },
    }),
  ],
});
