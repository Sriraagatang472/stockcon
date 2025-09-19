const express = require("express");
const path = require("path");
const app = express();


app.get("/stocks.json", (req, res) => {
  res.sendFile(path.join(__dirname, "stocks.json"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});