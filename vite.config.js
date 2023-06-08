import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue2'

import path from 'path' 

export default defineConfig({
    plugins: [
        laravel([
            'resources/scss/app.scss',
            'resources/scss/loader.css',
            'resources/js/app.js',
        ]),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
          alias: {
              '@': '/resources/js/src/',
              '@themeConfig': '/resources/js/themeConfig.js',
              '@core': '/resources/js/src/@core',
              '@validations': '/resources/js/src/@core/utils/validations/validations.js',
              '@axios': '/resources/js/src/libs/axios',
              'storage': '/public/storage',
              '@calidad': '/resources/js/calidadd',
              'views': '/resources/js/calidad/views',
              'mixins': '/resources/js/mixins',
              'store': '/resources/js/src/store',
              'components': '/resources/js/calidad/views/components',
              '@fuentes':'resources/js/src/assets/fonts/',
              '@images':'resources/js/src/assets/images/'

          }
    },
    optimizeDeps: {
      exclude: [
        'vue2-google-maps',
        'bootstrap-vue'
      ],
    },
});