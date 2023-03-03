const { Kafka } = require("kafkajs");

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "book-service",
      brokers: ["localhost:9092"]
    });
    const admin = kafka.admin();
    console.log("Connecting to Kafka...");
    await admin.connect();
    console.log("Connected to Kafka!");
    await admin.createTopics({
      topics: [
        {
          topic: "book-service",
          numPartitions: 2
        },
        {
          topic: "checkout-service",
          numPartitions: 2
        },
        {
          topic: "confirm-service",
          numPartitions: 2
        },
        {
          topic: "delivery-service",
          numPartitions: 2
        }
      ]
    });
    console.log("Created topics!");
    await admin.disconnect();
  } catch (err) {
    console.log(err);
  } finally {
    process.exit(0);
  }
};

run();
