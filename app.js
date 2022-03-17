const USER_DATA_PATH = "./data/users.json";

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

app.post("/users/signup", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (username === undefined || password === undefined)
    return res
      .status(400)
      .json({ message: "username or password is undefined" });
  if (username.length < 3 || password.length > 10)
    return res
      .status(400)
      .json({ message: "username length should be between 3 and 10" });
  if (password.length < 3 || password.length > 10)
    return res
      .status(400)
      .json({ message: "password length should be between 3 and 10" });

  const usersData = fs.readFileSync(USER_DATA_PATH);
  const userList = JSON.parse(usersData.toString());

  const alreadySignupUser = userList.find((user) => user.username === username);
  if (alreadySignupUser)
    return res.status(400).json({ message: "already registered username" });

  userList.push(req.body);
  fs.writeFileSync(USER_DATA_PATH, JSON.stringify(userList), (error) => {
    console.error(error);
  });
  return res.status(201).json({ message: "success in signup" });
});

app.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (username === undefined || password === undefined)
    return res
      .status(400)
      .json({ message: "username or password is undefined" });
  if (username.length < 3 || password.length > 10)
    return res
      .status(400)
      .json({ message: "username length should be between 3 and 10" });
  if (password.length < 3 || password.length > 10)
    return res
      .status(400)
      .json({ message: "password length should be between 3 and 10" });

  const usersData = fs.readFileSync(USER_DATA_PATH);
  const userList = JSON.parse(usersData.toString());
  const targetUser = userList.find((user) => user.username === username);
  if (!targetUser)
    return res.status(400).json({ message: "username does not exist" });
  if (targetUser.password !== password) {
    return res.status(400).json({ message: "password is not match" });
  }
  return res
    .status(201)
    .json({ message: "success in signin", username: targetUser.username });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
