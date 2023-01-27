//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ =require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const itemsSchema ={
  name: String
};
const Item = mongoose.model("Item",itemsSchema);
const eat = new Item({
  name: "Wellcome"
});
const run = new Item({
  name: "to your"
});
const sleep = new Item({
  name: "New List"
});
const defaultItem=[eat,run,sleep];
const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List",listSchema);


// Item.insertMany(defaultItem,function(err){
//   if(err){
//     console.log("Error Has been occured while inserting Items"+ err);
//   }else{
//     console.log("Success");
//   }
//
// });


app.get("/", function(req, res) {
  Item.find({},function(err,foundItems){
    if(err){
      console.log("Error Has been occured while finding Items"+ err);
    }else{

      if(foundItems.length===0){
        Item.insertMany(defaultItem,function(err){
          if(err){
            console.log("Error Has been occured while inserting Items"+ err);
          }else{
            console.log("Success");
          }
        });
        res.redirect ("/");
      }else{
        List.find({},function(err,arr){
          if(err){
            console.log(err);
          }else{
            res.render("list", {listTitle: "Today", newListItems: foundItems, selectList:arr});
          }
        });

      }

    }
  });
});


app.get("/:customListName",function(req,res){
  const customListName =_.capitalize(req.params.customListName);

  List.findOne({name:customListName}, function(err, result){
    if(!err){
      if(!result){
        //Create a new lis
        const list = new List({
          name: customListName,
          items: defaultItem
        });
        list.save();
        res.redirect("/"+customListName);
      }else {
        List.find({},function(err,arr){
          if(err){
            console.log(err);
          }else{
            res.render("list", {listTitle: result.name, newListItems: result.items, selectList:arr});
          }
        });
      }
    }

  });

});




app.post("/", function(req, res){
  const itemName= req.body.newItem;
  const listName= req.body.list;
  const item = new Item({
    name: itemName
  });
  if(listName ==="Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }



});
app.post("/delete",function(req,res){
  const checkedItem = req.body.checkbox;
  const listName = req.body.listName;

  if(listName==="Today"){
    Item.findByIdAndRemove(checkedItem,function(err){
      if(!err){
        console.log("Succesfuly deleted Item");
        res.redirect("/");
      }

    });

  }else{
    List.findOneAndUpdate({name:listName}, {$pull:{items: {_id:checkedItem}}}, function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }

});






app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
