export default {
  // Target deployment
  target: "server",

  // rendering mode SSR
  ssr: true,

  // progres bar laoder
  loading: {
    color: "white",
    height: "5px",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-ecommerce",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
      },
    ],
    script: [
      { src: "/js/coreui.bundle.min.js" },
      {
        src: "https://app.sandbox.midtrans.com/snap/snap.js",
        "SB-Mid-client-myCFuxooAW2BU4JV":
          "SB-Mid-server-B_JX1Fyxz6jj7WY6r0qyfDgo",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/style.min.css", "@/assets/css/custom.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // custom API
    "@/plugins/api",
    // https://www.npmjs.com/package/vue-star-rating
    { src: "~/plugins/vue-star-rating.js", mode: "client" },
    // https://www.chartjs.org/
    { src: "~/plugins/chart.js", mode: "client" },
    { src: "~/plugins/mixins.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    //https://dev.auth.nuxtjs.org/
    "@nuxtjs/auth-next",
    // https://www.npmjs.com/package/vue-sweetalert2/v/4.3.1
    "vue-sweetalert2/nuxt",
  ],

  // nuxt auth: https://auth.nuxtjs.org/
  auth: {
    strategies: {
      // *strategy "admin"
      admin: {
        scheme: "local",
        token: {
          property: "token",
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "/api/admin/login",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/admin/logout",
            method: "post",
          },
          user: {
            url: "/api/admin/user",
            method: "get",
            propertyName: "user",
          },
        },
      },

      // *strategy "customer"
      customer: {
        scheme: "local",
        token: {
          property: "token",
          required: true,
          type: "Bearer",
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: "/api/customer/login",
            method: "post",
            propertyName: "token",
          },
          logout: {
            url: "/api/customer/logout",
            method: "post",
          },
          user: {
            url: "/api/customer/user",
            method: "get",
            propertyName: "user",
          },
        },
      },
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://127.0.0.1:8000",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
