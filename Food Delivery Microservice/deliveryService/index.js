const { Kafka } = require("kafkajs");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/delivery", async (req, res) => {
  const kafka = new Kafka({
    clientId: "food-delivery",
    brokers: ["localhost:9092"]
  });
  const consumer = kafka.consumer({
    groupId: "test"
  });
  await consumer.connect();
  await consumer.subscribe({
    topic: "confirm-service",
    fromBeginning: true
  });
  await consumer.run({
    eachMessage: async (result) => {
      console.log(result.message.value);
      console.log(result.message.value);
    }
  });
});

app.listen(5003, () => console.log("Listening on 5000"));
