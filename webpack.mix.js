const mix = require('laravel-mix');
require('laravel-mix-workbox');

const path = require('path');
const ASSET_PATH = process.env.MIX_SENTRY_DSN_PUBLIC || 'public';

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
      '@fuentes':path.resolve(__dirname,'resources/js/src/assets/fonts/'),
      '@images':path.resolve(__dirname,'resources/js/src/assets/images/')
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
                includePaths: ['node_modules', 'resources/js/src/assets'],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: ['node_modules', 'resources/js/src/assets'],
              },
            },
          },
        ],
      },
  
    ]
    
  },

  output: {
    publicPath: '/',
    asyncChunks:true,
    path:path.resolve(__dirname,'public'),
    chunkFilename:`js/chunks/[chunkhash].js`
  },

  watchOptions: { 
    aggregateTimeout: 600,
    ignored: [
    '**/node_modules',
    ]
  },

});

mix.js('resources/js/app.js','js')
  .sass('resources/scss/app.scss','css')
  .vue({version:2})
  .options({
    postCss: [require('autoprefixer')]
  })
  
  .extract();

mix.after(webpackStats => {
  console.log('Compilación completada..');
});
  
mix.copy('resources/scss/loader.css', 'public/css');

if (mix.inProduction()) {
  
  mix.injectManifest({
    swSrc: './resources/js/service-worker.js'
  })
  .generateSW({
      //  directoryIndex: 'https://travelpoints.dev',
      exclude: [/\.(?:js)$/],
      cleanupOutdatedCaches:true,
      maximumFileSizeToCacheInBytes: 2097152 * 6 ,
      swDest: path.resolve(__dirname, 'public', 'service-worker.js'), 
      modifyURLPrefix: {
      '': ASSET_PATH,
      },
      clientsClaim: true,
      skipWaiting: true,
   
  });

 
}

// mix.version();