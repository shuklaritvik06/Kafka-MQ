const { Kafka } = require("kafkajs");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/book", async (req, res) => {
  const kafka = new Kafka({
    clientId: "food-delivery",
    brokers: ["localhost:9092"]
  });
  const producer = kafka.producer();
  console.log("Connecting.....");
  await producer.connect();
  console.log("Connected!");
  const partition = req.body.partition;
  await producer.send({
    topic: "book-service",
    messages: [
      {
        value: req.body.message,
        partition: partition
      }
    ]
  });
  res.status(200).json({
    msg: "Done the work"
  });
});

app.listen(5000, () => console.log("Listening on 5000"));
