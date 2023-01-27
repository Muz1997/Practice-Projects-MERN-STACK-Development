// getting-started.js
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/FruitDB');

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  const fruitSchema = new mongoose.Schema ({
    name: String,
    rating: {
      type : Number,
      min: 0,
      max: 10
    },
    review: String
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);
  const oragne = new Fruit({
    name: "oragne",
    rating: 7,
    review: "Citrusy fruit"
  });
  oragne.save();
  console.log("fruit is added");

  const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
  });

  const Person = mongoose.model("Person", personSchema);
  // const person = new Person({
  //   name: "Amy",
  //   age: 23,
  //   favouriteFruit: grape
  // });
  // person.save();

   Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);

    });
  }
});
