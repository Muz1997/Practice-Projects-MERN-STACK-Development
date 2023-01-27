const express = require("express");
const app=express();

app.get("/",function(res,req){
res.send("<h1>Hello World</h1>");
});
app.listen(3000,function(){
  console.log("Server Has been Started");
});
