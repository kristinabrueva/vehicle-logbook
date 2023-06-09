const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 4000;

const bodyParser = require("body-parser");

let makeValue = "";
let modelValue = "";
let badgeValue = "";

let fileContent = fs.readFile(
  "/Users/kris/logbook.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return "Error";
    }
    return data;
  }
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a GET route
app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});
app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/upload", (req, res) => {
  console.log({
    make: makeValue,
    model: modelValue,
    badge: badgeValue,
    // file: fileContent,
  });
  res.send({
    make: makeValue,
    model: modelValue,
    badge: badgeValue,
    // file: fileContent,
  });
});
app.post("/upload", (req, res) => {
  console.log("req", req.body);
  const { make, model, badge, file } = req.body;
  console.log(file);
  console.log(make);
  makeValue = make;
  modelValue = model;
  badgeValue = badge;
  // res.send(JSON.stringify({ data: "here" }));
  res.status(200).json(req.body);
});
