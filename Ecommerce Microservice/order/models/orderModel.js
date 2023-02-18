const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://ritvik:${process.env.PASSWORD}@cluster0.aeiaykn.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const orderSchema = new mongoose.Schema({
  product: {
    type: String
  },
  quantity: {
    type: Number
  },
  email: {
    type: String
  }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
