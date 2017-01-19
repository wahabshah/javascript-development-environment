import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

/* Cache Busting with chunkhash
   https://scottaddie.com/2015/12/14/a-practical-approach-to-cache-busting-with-webpack-and-asp-net-5/
*/

export default {
    debug: true,
    devtool: 'inline-source-map',
    noInfo:false,
    entry:{
      main:['webpack-hot-middleware/client?http://localhost:3000', path.resolve(__dirname,"src/index")]
  },
    target: "web",
    output:{
      path: path.resolve(__dirname,"src"),  //physical folder, but does not exist only used by html
      publicPath:"/",
      filename: "bundle.js"
    },
    plugins:[
        //Create HTML file that includes reference to bundles js
      new HtmlWebpackPlugin({template:'src/index.html',inject:true}),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module:{
      loaders: [
        {test:/\.js$/, exclude:/node_modules/,loaders:['babel']},
        {test:/\.css$/,loaders:["style",'css']}
      ]
    }
}
console.log("Webpack");
