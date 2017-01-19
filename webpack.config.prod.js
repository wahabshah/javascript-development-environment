import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    debug: true,
    devtool: 'source-map',
    noInfo:false,
    entry:{ 
      main:path.resolve(__dirname,"src/index"),
      vendor: path.resolve(__dirname,"src/vendor")
    },
    target: "web",
    output:{
      path: path.resolve(__dirname,"dist"),  //physical folder, but does not exist only used by html
      publicPath:"/",
      filename: "[name].js"
    },
    plugins:[
      //Use CommonChunkPlugin to create a seperate bundle 
      // of vendor libraries so that they are cached seperatly
      new webpack.optimize.CommonsChunkPlugin({name:'vendor'}),
      //Create HTML file that includes reference to bundles js
      new HtmlWebpackPlugin({
        template:'src/index.html',
        minify:{
          removeComments:true,
          collapseWhitespace:true,
          removeRedundantAttributes:true,
          useShortDoctype:true,
          removeEmptyAttributes:true,
          removeStyleLinkTypeAttributes:true,
          keepClosingSlash:true,
          minifyJS:true,
          minifyCSS:true,
          minifyURLs:true
        },
        inject:true}),
      //Eliminate duplicate packages when generating bundle
      new webpack.optimize.DedupePlugin(),
      //Minify js
      new webpack.optimize.UglifyJsPlugin()
    ],
    module:{
      loaders: [
        {test:/\.js$/, exclude:/node_modules/,loaders:['babel']},
        {test:/\.css$/,loaders:["style",'css']}
      ]
    }
}
console.log("Webpack");