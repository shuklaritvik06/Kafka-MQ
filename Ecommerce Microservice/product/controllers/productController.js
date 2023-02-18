const Product = require("../models/productModel");
const amqp = require("amqplib");
let channel;
function connect() {
  amqp.connect("amqp://rabbit-jib0").then((conn) => {
    conn.createChannel().then((ch) => {
      ch.assertQueue("order");
      channel = ch;
    });
  });
}
connect();
module.exports.create = (req, res) => {
  const { name, price, description, category, quantity } = req.body;
  Product.findOne({ name: name }, (err, product) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    if (product) {
      res.status(400).json({ message: "Product already exists" });
    } else {
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        quantity
      });
      newProduct.save((err, product) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          channel.sendToQueue("product", Buffer.from(JSON.stringify(product)));
          res.status(200).json(product);
        }
      });
    }
  });
};

module.exports.buy = (req, res) => {
  const { name, quantity } = req.body;
  Product.findOne({ name: name }, (err, product) => {
    if (err) {
      res.json({
        error: err
      });
    }
    if (product.quantity >= quantity) {
      channel.sendToQueue(
        "order",
        Buffer.from(
          JSON.stringify({
            id: product._id,
            name: name,
            quantity: quantity
          })
        )
      );
      res.status(200).json({ message: "Product added successfully" });
    }
  });
};
