module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: "vue-eslint-parser",
	extends: [
		"plugin:vue/recommended",
		"plugin:vue/vue3-strongly-recommended",
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"prettier"
	],
	overrides: [],
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["tsconfig.json"],
	},
	plugins: [
		"vue",
		"@typescript-eslint",
		"prettier",
	],
	rules: {
		"prettier/prettier": "error",
		"vue/html-self-closing": ["error", {
			"html": {
				"void": "never",
				"normal": "always",
				"component": "always"
			},
			"svg": "always",
			"math": "always"
		}]
	},
}
