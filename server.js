const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 4000;


mongoose.connect("mongodb://127.0.0.1:27017/todo", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})

const User = mongoose.model("User", userSchema);

// allow localhost 3000 requests
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  // create user account, return 500 err if no password or username given
    const {username, password} = req.body;
    if (username === '') {
      res.status(500);
      res.json({
        message: "Username empty",
      });
      return;
    }
    if (password === '') {
      res.status(500);
      res.json({
        message: "Password empty",
      });
      return;
    }
    // find if user exists, if yes send 500 err
    const user = await User.findOne({ username }).exec();
    if (user) {
      res.status(500);
      res.json({
        message: "User already exists",
      });
      return;
    }
    await User.create({ username, password });
    res.json({  
      message: "success",
    });
});

app.post("/login", async (req, res) => {
  // create user account
    const {username, password} = req.body;
    // find if user exists, if not send back 403 err
    const user = await User.findOne({ username }).exec();
    if (!user) {
      res.status(403);
      res.json({
        message: "User does not exist",
      });
      return;
    }
    //check password
    if (user && user.password !== password) {
      res.status(403);
      res.json({
        message: "Wrong password",
      });
      return;
    }

    res.json({
      message: "success",
    });
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
});
