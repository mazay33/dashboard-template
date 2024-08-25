// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: 'src',
	modules: [
		'@nuxt/ui',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@formkit/auto-animate/nuxt',
		'@nuxtjs/tailwindcss',
		'@vueuse/nuxt',
		'@nuxtjs/color-mode',
		'@nuxt/icon',
	],
	runtimeConfig: {
		public: {
			api: '',
		},
	},

	css: ['~/assets/style/main.css'],

	// routeRules: {
	//   // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
	//   "/": { prerender: true },
	// },

	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
});
