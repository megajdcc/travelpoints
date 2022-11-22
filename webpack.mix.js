const mix = require('laravel-mix');
require('laravel-mix-workbox');


const webpack = require('webpack');
// import webpack from 'webpack';

let path = require('path');
const ASSET_PATH = process.env.MIX_SENTRY_DSN_PUBLIC || 'public';

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

//  mix.override((config) => {
//   delete config.watchOptions;
// });

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js/src/'),
      '@themeConfig': path.resolve(__dirname, 'resources/js/themeConfig.js'),
      '@core': path.resolve(__dirname, 'resources/js/src/@core'),
      '@validations': path.resolve(__dirname, 'resources/js/src/@core/utils/validations/validations.js'),
      '@axios': path.resolve(__dirname, 'resources/js/src/libs/axios'),
      'storage': path.resolve(__dirname, 'public/storage'),
      '@calidad': path.resolve(__dirname, 'resources/js/calidadd'),
      'views': path.resolve(__dirname, 'resources/js/calidad/views'),
      'mixins': path.resolve(__dirname, 'resources/js/mixins'),
      'store': path.resolve(__dirname, 'resources/js/src/store'),
      'components': path.resolve(__dirname, 'resources/js/calidad/views/components'),
      '@fuentes':path.resolve(__dirname,'resources/js/src/assets/fonts/')
    }
  },
  module: {

    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'resolve-url-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules', 'resources/js/src/assets']
              }
            }
          },
          
          {
            loader:'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules', 'resources/js/src/assets']
              },
              sourceMap:true
            }
          }
        ]
      },

      // {
      //   test: /\.(otf|woff|woff2|eot|ttf)$/,
      //   use:['url-loader','file-loader']
      // },


      // {
      //   test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
      //   use:[
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: 'images/[path][name].[ext]',
      //         context:path.resolve(__dirname,'resources/js/src/assets/images')
      //       }
      //     }
      //   ]
      // }
    ]
  },
  
  output: {
    asyncChunks:false,
    path:path.resolve(__dirname,'public'),
    chunkFilename:`js/chunks/[name].[chunkhash].js`
  },

  watchOptions: { 
    aggregateTimeout: 600,
    ignored: [
    '**/node_modules',
    // path.resolve(__dirname,'resources/app.scss'),
    // path.resolve(__dirname,'resources/loader.css')
    // path.resolve(__dirname, 'storage'),
    // path.resolve(__dirname, 'vendor'),
    // path.resolve(__dirname, 'public/storage')
    ]
  }

})

mix
  .js('resources/js/app.js','js')
  .sass('resources/scss/app.scss','css')
  .vue({version:2})
  .options({
    postCss: [require('autoprefixer'), require('postcss-rtl')]
  })
  .extract();

mix.after(webpackStats => {
  console.log('Compilación completada..');
});
  
mix.copy('resources/scss/loader.css', 'public/css');

if (mix.inProduction()) {

  mix.generateSW({
    // Do not precache images
    exclude: [/\.(?:png|jpg|jpeg|svg)$/],

    // Define runtime caching rules.
    runtimeCaching: [{
      // Match any request that ends with .png, .jpg, .jpeg or .svg.
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

      handler: "NetworkFirst",

      // Apply a cache-first strategy.
      handler: 'CacheFirst',

      options: {
        // Use a custom cache name.
        cacheName: 'images',

        // Only cache 10 images.
        expiration: {
          maxEntries: 10,
        },
      },
    }],

    ignoreURLParametersMatching: [
      /^utm_/,
      /^fbclid$/
    ],

    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 10485760
  });

 
}

 mix.version();



// mix.browserSync('https://byp.com')
