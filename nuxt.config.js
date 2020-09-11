const ampify = import('./plugins/ampify')
export default {
  env: {
    baseUrl: process.env
      ? 'http://localhost:3000/api/v1/'
      : 'https://api-tryout.edutore.net/app/api/v1/'
  },
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Test Edutore Tryout by Gramedia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'canonical', rel: 'canonical', href: 'https://tes.edutore.com' },
      {
        hid: 'description',
        name: 'description',
        content: 'Tryout Edutore By Gramedia'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ],
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-135612854-1',
        async: true
      }
      // { src: 'https://www.googletagmanager.com/gtag/js?id=UA-121329288-2', async: true }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#209CEE',
    height: '5px',
    failedColor: 'red',
    throttle: 0,
    continuous: true,
    css: true
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/animate.css',
    '@/assets/css/main.css',
    '@/assets/css/custome.css',
    '@/assets/css/styles.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // '~/plugins/fontawesome.js',
    '@/plugins/lazyload',
    '@/plugins/sweetalert',
    '@/plugins/vee-validate.js',
    '@/plugins/notif.js',
    { src: '~plugins/swiper.js', ssr: false }
    // { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/pwa',
    '@nuxtjs/amp',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-135612854-1'
        // id: 'UA-121329288-2'
      }
    ]
  ],
  moment: {
    locales: ['id']
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    '@nuxtjs/moment',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/google-gtag'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'http://localhost:3000/api/v1/'
    baseURL: 'https://api-tryout.edutore.com/app/api/v1/'
  },
  proxy: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  hooks: {
    // This hook is called before saving the html to flat file
    'generate:page': (page) => {
      if (/^\/amp\//gi.test(page.route)) {
        // eslint-disable-next-line no-console
        console.log('processing amp file: ', page.route)
        page.html = ampify(page.html)
      }
    },
    // This hook is called before serving the html to the browser
    'render:route': (url, page, { req, res }) => {
      if (/^\/amp\//gi.test(url)) {
        page.html = ampify(page.html)
      }
    }
  }
}
