import express from "express";
import path from "path";
import open from "open";
import compression from 'compression';


const port = 3000;
const app = express();

//GZip
app.use(compression());
app.use(express.static("dist"));

app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"../dist/index.html"));
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
