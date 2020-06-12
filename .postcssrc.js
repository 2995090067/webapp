// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
	plugins: {
		'autoprefixer': {
			browsers: ['Android >= 4.0', 'iOS >= 7']
		},
		'postcss-pxtorem': {
			rootValue: 50,
			propList: ['*'],
			// selectorBlackList:[
			// 	'van-'
			// ]
		}
	}
}
