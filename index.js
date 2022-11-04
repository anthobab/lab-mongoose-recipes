const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    // Run your code here, after you have insured that the connection was made
    // const firstRecipe = await Recipe.create(data[0]);
    // console.log(firstRecipe.title);
    const recipes = await Recipe.insertMany(data);
    recipes.forEach((el) => console.log(el.title));
    const update = { duration: 100 };
    const newRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      update,
      { new: true }
    );
    console.log(`update sucessfully duration : ${newRecipe.duration}`);
    await Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(mongoose.disconnect);
