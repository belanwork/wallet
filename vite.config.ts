import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { ConfigEnv, defineConfig, UserConfig } from 'vite';

import { version } from './package.json';

const DEBUG_HOST = 'localhost';
const DEBUG_PORT = 5000;

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const isProduction = mode === 'production' || mode === 'analyze';

  console.log('VITE_APP_VERSION:', version);

  return {
    build: {
      minify: isProduction,
      outDir: 'dist',
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Разделяем модули на чанки на основе их имени
              // например, lodash будет в отдельном чанке с именем 'vendor-lodash'
              const directories = id.split('/');
              const packageName =
                directories[directories.lastIndexOf('node_modules') + 1];
              return `vendor-${packageName}`;
            }
          },
        },
        treeshake: true,
      },
      sourcemap: !isProduction,
    },
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
    plugins: [
      react(),
      // Аналог Webpack BundleAnalyzerPlugin
      mode === 'analyze' &&
        visualizer({
          brotliSize: true, // покажет размер brotli-сжатия
          filename: 'dist/stats.html', // файл, куда будет сохранен результат
          gzipSize: true, // покажет размер gzip-сжатия
          open: true, // автоматически открывает результат в браузере
        }),
    ],
    resolve: {
      alias: {
        API: path.resolve(__dirname, 'src', 'API'),
        components: path.resolve(__dirname, 'src', 'components'),
        data: path.resolve(__dirname, 'src', 'data'),
        hooks: path.resolve(__dirname, 'src', 'hooks'),
        i18n: path.resolve(__dirname, 'src', 'i18n'),
        pages: path.resolve(__dirname, 'src', 'pages'),
        plugins: path.resolve(__dirname, 'src', 'plugins'),
        schema: path.resolve(__dirname, 'src', 'schema'),
        shared: path.resolve(__dirname, 'src', 'shared'),
        theme: path.resolve(__dirname, 'src', 'theme'),
        utils: path.resolve(__dirname, 'src', 'utils'),
      },
    },
    root: path.resolve(__dirname),
    server: {
      host: DEBUG_HOST,
      open: true,
      port: DEBUG_PORT,
    },
  };
});
