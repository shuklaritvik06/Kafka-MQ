const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://ritvik:z8Ys1kCUPfngLKkw@cluster0.aeiaykn.mongodb.net/ecommerce-microservice?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  description: String,
  category: String,
  date: { type: Date, default: Date.now }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
