const express = require('express');
const Router = require("./routes/productRoute");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",Router);
app.listen(5002, () => console.log('Listening on port 5002'));
