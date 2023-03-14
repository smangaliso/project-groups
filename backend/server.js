const express = require("express");
const data = require("./data");
const app = express();
const cors = require("cors");

app.use(cors());
app.listen(3002, () => {
  console.log("Express app listening on port 3002");
});

app.get("/projects", (req, res) => {
  res.json(data);
  
});
