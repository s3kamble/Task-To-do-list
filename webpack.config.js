const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const config = {
        entry:{
            app:path.resolve(__dirname,"src","app.js"),
        },

        output:{
            path:path.resolve(__dirname,"dist"),
            filename:"./src/[name].bundle.[contenthash].js"
        },

        mode:"none",

        module: {
            rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
      },
      plugins: [
          new MiniCssExtractPlugin({
            filename:"./styles/style.css"
          }),
          new HtmlWebpackPlugin({
            filename:"./index.html",
            template:"./index.html"
          }),
          new FaviconsWebpackPlugin("images/favicon-16x16.png")
        ],
        
        optimization: {
          minimizer: [
            new CssMinimizerPlugin(),
        ],
    },

    }



module.exports=config;

