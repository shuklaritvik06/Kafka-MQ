const Order = require("../models/orderModel");
const amqp = require("amqplib");
let channel;
function connect() {
  amqp
    .connect(
      `amqp://shuklaritvik06:${process.env.RABBITPASSWORD}@rabbit-jib0:5672`
    )
    .then((conn) => {
      conn.createChannel().then((ch) => {
        channel = ch;
      });
    });
}
connect();
module.exports.checkout = (req, res) => {
  const { email } = req.body;
  channel.consume("order", (msg) => {
    const data = JSON.parse(msg.content.toString());
    const order = new Order({
      name: data.name,
      quantity: data.quantity,
      email: email
    });
    order.save().then(() => {
      res.status(200).json({ message: "Order placed successfully" });
    });
  });
};
