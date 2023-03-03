const { Kafka } = require("kafkajs");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/checkout", async (req, res) => {
  const kafka = new Kafka({
    clientId: "food-delivery",
    brokers: ["localhost:9092"]
  });
  const producer = kafka.producer();
  await producer.connect();
  const consumer = kafka.consumer({
    groupId: "test"
  });
  await consumer.connect();
  await consumer.subscribe({
    topic: "book-service",
    fromBeginning: true
  });
  await consumer.run({
    eachMessage: async (result) => {
      console.log(result.message.value);
      await producer.send({
        topic: "checkout-service",
        messages: [
          {
            value: result.message.value,
            partition: result.partition
          }
        ]
      });
    }
  });
  res.send("Done shifting!");
});

app.listen(5001, () => console.log("Listening on 5000"));
