const amqplib = require("amqplib/callback_api");
amqplib.connect("amqp://localhost:5672", (err, conn) => {
  if (err) throw err;
  conn.createChannel((err, ch) => {
    if (err) throw err;
    const queue = "learning";
    ch.assertQueue(queue);
    ch.sendToQueue(queue, Buffer.from("Hello World"));
    ch.sendToQueue(queue, Buffer.from("Hello Duniya"));
    console.log("Message sent");
  });
  setTimeout(()=>{
    conn.close();
    process.exit(0);
  }, 500);
});
