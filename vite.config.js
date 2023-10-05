import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue2'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'; 
import path from 'path'

const host = 'travelpoints.es'; 
export default defineConfig({
    // base:import.meta.env['BASE_URL'],
    plugins: [
        laravel({
            refresh:['resources/views/**'],
            buildDirectory:'build',
            input:['resources/js/app.js'],
            //  ssr: 'resources/js/ssr.js',
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base:null,
                    includeAbsolute: false,
                   
                },
            },
        }),
    //    VitePWA({
    //         outDir: 'public/build',
    //         registerType:"autoUpdate",
    //         manifest:'public/manifest.json',
    //         workbox: {
    //             globStrict:true,
    //             globPatterns: ['**/*.{js,css,ico,png,jpg,jpeg,svg}'],
    //             skipWaiting: true,
    //             maximumFileSizeToCacheInBytes:2097152 * 6,
    //             globIgnores: ["**\\/node_modules\\/**\\/*", "**\\/*.{html}","**\\/*.{php}"],
    //             runtimeCaching:[{
    //                 urlPattern: ({url}) => url.origin === host,
    //                 handler: 'CacheFirst',
    //                 options: {
    //                     cacheName: 'api-cache',
    //                     expiration: {
    //                         maxAgeSeconds: 2592000, // 30 días en segundos
    //                     },
    //                 },
    //             },{
    //                 urlPattern:({request}) => request.destination === 'image',
    //                 handler:'CacheFirst',
    //                 options: {
    //                     cacheName: 'images-cache',
    //                     expiration: {
    //                         maxAgeSeconds: 2592000, // 30 días en segundos
    //                     },
    //                 },
    //             }],
    //         },
    //         devOptions: {
    //             enabled: true,
    //         }
    //     })

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
              '@fuentes':'./resources/js/src/assets/fonts/',
              '@images':path.resolve(__dirname,'./resources/js/src/assets/images/'),
              '@variables':'./resources/js/src/assets/scss/variables/'
            //   'images':path.resolve(__dirname,'./resources/js/src/assets/images/'),


          }
    },

    server: { 
        host, 
        hmr: { host }, 
        https: { 
            key: fs.readFileSync(`/home/megajdcc/jdcc/certificados/travelpoints.key`), 
            cert: fs.readFileSync(`/home/megajdcc/jdcc/certificados/travelpoints.crt`), 
        }, 
    }, 

    build:{
        // assetsInlineLimit:0,
        manifest:true,
        sourcemap:true,
        chunkSizeWarningLimit:5000,
        commonjsOptions: {
            requireReturnsDefault: true,
        },
    },
  
});