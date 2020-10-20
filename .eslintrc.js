module.exports = {
	root: true,
	env: {
		node: true,
		browser: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: ['prettier', 'plugin:vue/recommended'],
	rules: {
		'no-console': "off",
		'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
		quotes: ['warn', 'single', { allowTemplateLiterals: true }],
		'linebreak-style': 'off',
		camelcase: [0, { properties: 'never' }],
		'vue/multiline-html-element-content-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/html-self-closing': 'off',
		'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
		'vue/no-unused-components': ['warn', { ignoreWhenBindingPresent: true }],
		'prefer-const': 'warn',
		'spaced-comment': 'warn',
		'vue/max-attributes-per-line': ['warn', {
			'singleline': 10,
			'multiline': {
				'max': 10,
				'allowFirstLine': true
			}
		}],
	}
}
