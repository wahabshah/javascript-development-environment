import express from "express";
import path from "path";
import open from "open";
import webpack from "webpack";
import webpackconfig from "../webpack.config.dev";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";


const port = 3000;
const app = express();
const compiler  = webpack(webpackconfig);

app.use( webpackDevMiddleware(compiler,{
      noInfo:true,
      publicPath: webpackconfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"../src/index.html"));
});

app.get("/users",function(req,res){
    //Here hardcoding for simplicity, Pretend this hits the DB
    res.json([
      {"id":1,"firstName":"Bob","lastName":"Smith"},
      {"id":2,"firstName":"Tammy","lastName":"North"}
    ]);
});

app.listen(port, function(err){
  if(err){
   console.log(err);
  }
   else{
      open("http://localhost:"+ port); // eslint-disable-line no-console
   }
});
