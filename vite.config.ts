import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function persistProfileMediaPlugin(): Plugin {
  return {
    name: 'persist-profile-media',
    configureServer(server) {
      server.middlewares.use('/api/save-profile-media', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({error: 'Method not allowed'}));
          return;
        }

        const urlObj = new URL(req.url || '', 'http://localhost');
        const slot =
          urlObj.searchParams.get('slot') === 'cvProfileMedia'
            ? 'cvProfileMedia'
            : 'headerPortrait';
        const mediaType =
          urlObj.searchParams.get('mediaType') === 'video' ? 'video' : 'image';
        const rawExt = (urlObj.searchParams.get('ext') || 'png')
          .replace(/[^a-zA-Z0-9]/g, '')
          .toLowerCase();
        const ext = rawExt || (mediaType === 'video' ? 'mp4' : 'png');

        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => {
          chunks.push(Buffer.from(chunk));
        });

        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            const assetsDir = path.resolve(__dirname, 'public/assets/aistudio');
            fs.mkdirSync(assetsDir, {recursive: true});

            const fileBaseName =
              slot === 'cvProfileMedia'
                ? `cv-profile-media.${ext}`
                : `header-portrait.${ext}`;
            const targetFilePath = path.join(assetsDir, fileBaseName);
            fs.writeFileSync(targetFilePath, buffer);

            const manifestPath = path.join(assetsDir, 'profile-media.json');
            let manifest: Record<string, unknown> = {
              headerPortrait: null,
              cvProfileMedia: null,
            };
            if (fs.existsSync(manifestPath)) {
              try {
                manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
              } catch {
                // use default manifest
              }
            }

            const publicUrl = `/assets/aistudio/${fileBaseName}`;
            manifest[slot] = {
              url: publicUrl,
              mediaType,
              fileName: fileBaseName,
              updatedAt: Date.now(),
            };

            fs.writeFileSync(
              manifestPath,
              JSON.stringify(manifest, null, 2),
              'utf8'
            );

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(
              JSON.stringify({
                ok: true,
                slot,
                url: publicUrl,
                mediaType,
              })
            );
          } catch (err) {
            res.statusCode = 500;
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : 'Save failed',
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), persistProfileMediaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
