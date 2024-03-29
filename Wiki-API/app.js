const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');

const articleSchema = {
  title: String,
  content:String
};

const Article =mongoose.model("Article", articleSchema);

app.route("/articles").get(function(req, res){
  Article.find({},function(err,foundArticle){
    if(!err){
      res.send(foundArticle);
    }else{
      res.send(err);
    }
  });
})

.post(function(req, res){
  const newarticle= new Article({
    title:req.body.title,
    content:req.body.content
  });
  newarticle.save(function(err){
    if(!err){
      res.send("Successfully added a new article");
    }else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted articles");
    }else{
      res.send(err);
      console.log(err);
    }
  });
});
////////////////////Request Targeting specific Arrticles//////////////
app.route("/articles/:articleTitle")
.get(function(req,res){
  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if(!err){
      if(foundArticle){
        res.send(foundArticle);
      }else{
        res.send("No Article Found");
      }
    }else{
      console.log(err);
    }

  });
})
.put(function(req,res){
  Article.replaceOne(
    {title:req.params.articleTitle},
    {
      title:req.body.title,
      content:req.body.content
    },function(err){
      if(!err){
        res.send("Successfully Updated");
        console.log(req.body.title);
      }else{
        res.send("There's issues : "+err);
        console.log(err);
      }
    }
  );
})

.patch(function(req,res){
  Article.updateOne({title:req.params.articleTitle},
  {$set:req.body},function(err){
    if(err){
      res.send("Successfully updated article");
    }else{
      res.send(err);
    }
  });
})
.delete(function(req,res){
  Article.deleteOne({title:req.params.articleTitle},function(err){
    if(!err){
      res.send("Successfully deleted");
    }else{
      res.send(err);
      console.log(err);
    }
  });
});





app.listen(3000,function(){
  console.log("Server started on port 3000");
});
