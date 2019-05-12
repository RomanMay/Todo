let path = require('path')
let conf = {
	entry: './public/javascripts/todo.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'main.bundle.js'
	},
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	}
}
module.exports = conf