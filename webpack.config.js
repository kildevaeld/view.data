const Path = require('path');
const webpack = require('webpack');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;



const babelOptions = {

};

module.exports = {
    entry: './src/example/index.ts',
    resolve: {
        mainFields: ['module', 'browser', 'main'],
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    mode: 'development',
    output: {
        filename: 'example.js',
        path: Path.join(process.cwd(), 'example'),
        //library: 'view',
        //libraryTarget: 'umd'
    },
    /*externals: {
        "slick-di": "slick-di"
    },*/
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{
                    loader: 'babel-loader',
                    options: babelOptions
                },
                {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            declaration: false
                        }
                    }
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: babelOptions
            }]
        }]
    },
    plugins: [
        new WebpackBundleSizeAnalyzerPlugin('plain-report.txt')
    ],
    node: {
        console: false,
        global: false,
        process: false,
        __filename: "mock",
        __dirname: "mock",
        Buffer: false,
        setImmediate: false
    }
}