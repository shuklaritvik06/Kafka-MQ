const amqplib = require("amqplib/callback_api");
amqplib.connect("amqp://localhost:5672", (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    const queue = "learning";
    ch.assertQueue(queue);
    console.log("Waiting for messages from Queue: %s", queue);
    ch.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      } else {
        console.log("Consumer cancelled by server");
      }
    });
  });
  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
