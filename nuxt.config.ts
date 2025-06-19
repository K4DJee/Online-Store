// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
								compatibilityDate: '2024-11-01',
								devtools: { enabled: true },
								modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@pinia/nuxt'],

								app: {
																head: {
																								link: [
																																{ rel: 'stylesheet', href: '/main.css' }, // Path relative to /public
																								],
																},
								},

								components: {
																dirs: [
																								{
																																path: '~/components',
																																pathPrefix: false,
																																global: true,
																								},
																								{
																																path: '~/entities/ui',
																																pathPrefix: false,
																																global: true,
																								},
																								{
																																path: '~/features/ui',
																																pathPrefix: false,
																																global: true,
																								},
																								{
																																path: '~/widgets/ui',
																																pathPrefix: false,
																																global: true,
																								},
																],
								},

								runtimeConfig: {
																public: {
																								apiBase: '/api',
																},
								},
								nitro: {
																devProxy: {
																								'/api': {
																																target: 'http://localhost:8000',
																																changeOrigin: true,
																								},
																},
								},
})