const express = require("express");
const app = express();
const todoRoutes = require("./routes/routes");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require('path')

const uri = process.env.URI;
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(todoRoutes);
app.use(express.static(path.join(__dirname ,'build')))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname ,'build/index.html'))
})

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Server running on http://localhost:5000`);
    });
  })
  .catch((err) => {
    console.error("Could not connect to DB:", err);
    process.exit(1);
  });
