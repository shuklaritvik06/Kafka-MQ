const express = require('express');
const Router = require("./routes/orderRoute");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",Router);
app.listen(5001, () => console.log('Listening on port 5001'));
