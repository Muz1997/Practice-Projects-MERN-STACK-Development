const express =require("express");
const app = express();
app.get("/",function(req,res){
  res.send("<h1>Hello World!</h1>");
});
app.get("/about",function(req,res){
  res.send("<h1>I'm Muzam A Webdeveoper</h1>")
});
app.get("/contact",function(req,res){
  res.send("<h1>Contact me at Muzam ali @gmail.com</h1>")
});

app.listen(3000, function(){
  console.log("Server have been start at port N0: 3000");
});
