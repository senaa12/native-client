const path = require("path");
const webpack = require("webpack");

const isProd = process.env.ENV !== "dev";

module.exports = {
    target: 'node',
    entry: './src/index.ts',
     output: {
        path: path.resolve('public'),
        filename: 'host.js'
    },
    resolve: {
      alias: {
        'common-native-client': path.resolve(__dirname, './common-native-client'),
      },
      extensions: [ '.ts', '.js' ]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          include: [
             path.resolve(__dirname, 'src'), 
             path.resolve(__dirname, './common-native-client')
          ],
          loader: "awesome-typescript-loader"
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ 
        'process.env': { 
            PRODUCTION: JSON.stringify(isProd),
        }
      })
    ]
}
