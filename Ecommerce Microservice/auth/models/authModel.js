const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://ritvik:z8Ys1kCUPfngLKkw@cluster0.aeiaykn.mongodb.net/ecommerce-microservice?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now()
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
