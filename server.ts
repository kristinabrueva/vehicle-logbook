const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const bodyParser = require("body-parser");

let model = "";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
app.get("/upload", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
app.post("/upload", (req, res) => {
  const r = req.body;
  console.log("body:", r);
  res.status(200).json({ make: "Tesla", model: "Model 3" });
});
