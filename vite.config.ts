import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "path"
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/assets/scss/_mixins.scss"; @import "@/assets/scss/_variables.scss";`,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	plugins: [
		vue(),
		createSvgIconsPlugin({
			// Specify the icon folder to be cached
			iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
			symbolId: "icon-[dir]-[name]",
			inject: "body-last" || "body-first",
			customDomId: "__svg__icons__dom__",
		}),
	],
})
