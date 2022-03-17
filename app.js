const express = require("express");
const app = express();
const port = 5500;

app.post("/users/signup", (req, res) => {
  console.log(req.body);
  return res.status(201).json({ message: "success in signup" });
});

app.post("/users/signin", (req, res) => {
  console.log(req.body);
  return res.status(201).json({ message: "success in signin" });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
