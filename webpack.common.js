var path = require("path");
var VueLoaderPlugin = require("vue-loader/lib/plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var glob = require("glob");
var webpack = require("webpack");
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin')

var isDevMode = process.env.NODE_ENV !== "production";

let entries = {};

let pages = glob.sync("./**/*.page.ts");

let pageRegex = /\.(?:\/)?(?:Areas\/(.*))?\/Views\/(.*)\/(.*).page.ts/;

pages.forEach((file) => {

    if (pageRegex.test(file)) {

        let entryName = file.replace(pageRegex, function (str, $1, $2, $3){
            let result = "";
            if ($1) {
                result += $1 + "/";
            }

            result += `${$2}/${$3}`;
            return result;
        });

        entries[entryName.toLowerCase()] = file;
    }

});

var standAloneEntries = {
    bootstrap: './node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
};

entries = Object.assign(entries, standAloneEntries);

module.exports = {
    context: __dirname,
    entry: entries,
    output: {
        path: path.resolve(__dirname, "wwwroot/app/"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: file => /node_modules/.test(file)
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {

                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    compilerOptions: {
                        noEmit: false
                    },
                    // Отключение type-checking для ускорения работы loader-а. Проверка типов будет делаться плагином fork-ts-checker-webpack-plugin в отдельном потоке
                    transpileOnly: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: 'jQuery'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["wwwroot/app/"]),
        new webpack.DefinePlugin({
            __DEVELOPMENT_MODE: isDevMode
        }),
        new VueLoaderPlugin({
            hotReload: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new ForkTsCheckerWebpackPlugin({
            vue: true
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ],
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return !Object.keys(standAloneEntries).includes(chunk.name);
            },
            cacheGroups: {
                default: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor/libs',
                    priority: 1
                },
                baseLayout: {
                    name: 'layouts/baseLayout',
                    minChunks: Object.keys(pages).length//,
                }
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', 'vue']
    },
    externals: {
        'highlight.js': "hljs"
    },
    // если хотим подробный лог - комментим строки
    //stats: "errors-only"
    stats: "minimal"
};