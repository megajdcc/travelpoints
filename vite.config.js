import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue2'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path' 
import fs from 'fs'; 
 
const host = 'travelpoints.dev'; 
export default defineConfig({
    // base:'https://travelpoints.dev',
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
    //         injectRegister: 'inline',
    //         registerType: 'autoUpdate',
    //         workbox: {
    //             globPatterns: ['**/*.{ico,png,svg,ttf}']
    //         },
    //         devOptions: {
    //             enabled: true
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
              '@fuentes':'resources/js/src/assets/fonts/',
              '@images':'resources/js/src/assets/images/'

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
        assetsInlineLimit:0,
        // cssCodeSplit:false,
        manifest:true,
        sourcemap:true,
        chunkSizeWarningLimit:5000
    },
    

    // proxy: {
    //     '/': 'https://travelpoints.dev',
    // },
});