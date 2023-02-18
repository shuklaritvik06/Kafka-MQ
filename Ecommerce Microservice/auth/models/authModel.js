const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://ritvik:${process.env.PASSWORD}@cluster0.aeiaykn.mongodb.net/?retryWrites=true&w=majority`
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
