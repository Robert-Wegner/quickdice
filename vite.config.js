// vite.config.js
import { defineConfig } from 'vite';
import { mkdir, readdir, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'path';

function sitesWorker() {
  return {
    name: 'sites-worker',
    async closeBundle() {
      const buildDirectory = resolve(__dirname, 'dist');
      const publicDirectory = resolve(buildDirectory, 'client');
      const serverDirectory = resolve(buildDirectory, 'server');
      await mkdir(publicDirectory, { recursive: true });
      for (const entry of await readdir(buildDirectory)) {
        if (entry !== 'client' && entry !== 'server') {
          await rename(resolve(buildDirectory, entry), resolve(publicDirectory, entry));
        }
      }
      await mkdir(serverDirectory, { recursive: true });
      await writeFile(
        resolve(serverDirectory, 'index.js'),
        "export default { fetch: (request, env) => env.ASSETS.fetch(request) };\n",
      );
    },
  };
}

export default defineConfig({
  plugins: [sitesWorker()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        popover: resolve(__dirname, 'popover.html'),
      },
    },
  },
});
