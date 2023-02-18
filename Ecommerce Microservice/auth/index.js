const express = require('express');
const Router = require("./routes/authRoute");
const app = express();
app.use(express.json());
app.use("/",Router);
app.listen(5000, () => console.log('Listening on port 5000'));
