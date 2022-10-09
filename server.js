const express = require("express");
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const app = express();
const port = 4000;

app.use(cors()); // allow localhost 3000 requests
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/portfolio", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})
const User = mongoose.model("User", userSchema);

const stocksSchema = new mongoose.Schema({
  username: String,
  stocks: [
    {
      ticker: String,
      amount: Number,
      prevClose: Number,
    }
  ],
  history: [
    {
      date: String,
      value: Number
    }
  ],
})
const Stocks = mongoose.model("Stocks", stocksSchema);

app.post("/register", async (req, res) => {
  // create user account, return 500 err if no password or username given
    let {username, password} = req.body;

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
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    await User.create({ username, password });

    res.json({  
      message: "success",
      username: username,
      password: password
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
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (user && !passwordIsValid) {
      res.status(403);
      res.json({
        message: "Wrong password",
      });
      return;
    }

    res.json({
      message: "success",
      username: username,
      password: user.password
    });
});

app.post("/stock_add", async (req, res) => {
  // add stocks to db
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const stockItems = req.body.newStock;
  // auth user, if not found, return
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }

  // get date
  const currentdate = new Date(); 
  const today =     currentdate.getFullYear() + "-"
                  + (currentdate.getMonth()+1)  + "-" 
                  + currentdate.getDate() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes()
  // get ticker, if not exists, return
  const stockInfo = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stockItems.ticker}`)
  const stockInfoJson = await stockInfo.json()
  if (!stockInfoJson.chart.result) {
    res.status(403);
    res.json({
      message: "Stock not found",
    });
    return;
  }
  const conversionRate = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stockInfoJson.chart.result[0].meta.currency}USD=X`)
  const conversionRateJson = await conversionRate.json();
  
  const value = (stockInfoJson.chart.result[0].meta.previousClose * conversionRateJson.chart.result[0].meta.previousClose).toFixed(2);
  
  const stocks = await Stocks.findOne({ username: username }).exec();
  if (!stocks) {
    // if no stock history (first commit), create new
    await Stocks.create({
      username: username,
      stocks: [{
        ticker: stockItems.ticker, 
        amount: stockItems.amount,
        prevClose: value,
      }],
      history: [{
        value: value * stockItems.amount,
        date: today
      }]
    });
    res.json([{ticker: stockItems.ticker, amount: stockItems.amount}]);
    return;

  } else {
    // if stock history, push to existing db
    const stockIndex = stocks.stocks.map(item => item.ticker).indexOf(stockItems.ticker);
    if (stockIndex === -1) {
      // stock does not exist, push new
      stocks.stocks.push({
        ticker: stockItems.ticker, 
        amount: stockItems.amount,
        prevClose: value,
      });
    } else {
      // stock exists, add amount
      stocks.stocks[stockIndex].amount += parseInt(stockItems.amount);
    }

    stocks.history.push({
      value: stocks.history.slice(-1)[0].value + value * stockItems.amount,
      date: today
    })
    await stocks.save();
  }
  res.json(stocks.stocks);
});

app.post("/stock_remove", async (req, res) => {
  // replace stocks
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const stockItems = req.body.stockToDelete;
  // auth user, if not found, return
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }

  const stocks = await Stocks.findOne({ username: username }).exec();

  if (stockItems.amount === 0) {
    // if new amt = old amt, remove stock from db
    await Stocks.updateOne({ username: username }, { $pull: { stocks: { ticker: stockItems.ticker } } }).exec();
  
  } else if (stockItems.amount > 0) {
    const stockIndex = stocks.stocks.map(item => item.ticker).indexOf(stockItems.ticker);
    stocks.stocks[stockIndex].amount = parseInt(stockItems.amount);
  }
  await stocks.save();
  res.json(stocks.stocks);

});

app.post("/update", async (req, res) => {
  // replace stocks
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  // auth user, if not found, return
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }



});

app.get("/stocks", async (req, res) => {
  // send todos to client
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const foundStocks = await Stocks.findOne({ username: username }).exec();
  if (foundStocks) {
    const stocks = foundStocks.stocks;
    res.json(stocks);
  } else {
    res.json([]);
  }
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
});

