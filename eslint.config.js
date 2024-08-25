// eslint.config.js
import antfu from '@antfu/eslint-config';

export default antfu({
	type: 'lib',
	rules: {
		'no-console': 'warn',
		'style/brace-style': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/html-self-closing': 'off',
	},

	stylistic: {
		indent: 'tab', // 4, or 'tab'
		quotes: 'single', // or 'double'
		semi: true,
	},

	// TypeScript and Vue are autodetected, you can also explicitly enable them:
	typescript: true,
	vue: true,

	// Disable jsonc and yaml support
	jsonc: false,
	yaml: false,

	// `.eslintignore` is no longer supported in Flat config, use `ignores` instead
	ignores: [
		'**/fixtures',
		// ...globs
	],
});
