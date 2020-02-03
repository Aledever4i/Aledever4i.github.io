const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new OptimizeCssAssetsPlugin()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin()
        ]
    }
});