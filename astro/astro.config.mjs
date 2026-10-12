import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://thecollinsvillecardshow.com',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/(admin|vendor-tables\/(receipt|mock-checkout))\/?$/.test(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
