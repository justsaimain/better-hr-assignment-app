export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "app",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class:
        "h-screen overflow-hidden flex items-start justify-center antialiased font-sans bg-gray-200",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "nuxt-graphql-request",
    // https://github.com/whardier/nuxt-hero-icons
    "@nuxt-hero-icons/outline/nuxt",
    "@nuxt-hero-icons/solid/nuxt",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/toast"],

  axios: {
    baseURL: process.env.APP_API_URL, // Used as fallback if no runtime config is provided
  },

  auth: {
    redirect: {
      login: "/auth/login",
      home: "/",
    },
    strategies: {
      local: {
        token: {
          property: "token",
          maxAge: 1800,
          type: "Bearer",
        },
        user: {
          property: "user",
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user", method: "get" },
        },
      },
    },
  },

  router: {
    middleware: ["auth"],
  },

  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        /**
         * The client endpoint url
         */
        endpoint: "http://127.0.0.1:8000/graphql",
        /**
         * Per-client options overrides
         * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
         */
        options: {},
      },
    },

    /**
     * Options
     * See: https://github.com/prisma-labs/graphql-request#passing-more-options-to-fetch
     */
    options: {
      method: "get", // Default to `POST`
    },

    /**
     * Optional
     * default: true (this includes cross-fetch/polyfill before creating the graphql client)
     */
    useFetchPolyfill: true,

    /**
     * Optional
     * default: false (this includes graphql-tag for node_modules folder)
     */
    includeNodeModules: true,
  },

  toast: {
    position: "top-right",
    duration: 2000,
  },
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
