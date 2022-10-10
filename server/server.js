const express = require("express");
const cors = require('cors');

const mongoose = require('mongoose');
const Stocks = require("./schemas/stocks")

const login = require("./routes/login")
const register = require("./routes/register")
const stock_add = require("./routes/stock_add")
const stock_remove = require("./routes/stock_remove")
const stocks = require("./routes/stocks")
const stocks_history = require("./routes/stocks_history")

const updateStock = require("./functions/update_stock")

const app = express();
const port = 4000;

app.use(cors()); // allow localhost 3000 (client) requests
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/portfolio", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});


app.use("/", login);
app.use("/", register);
app.use("/", stock_add);
app.use("/", stock_remove);
app.use("/", stocks);
app.use("/", stocks_history);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
});


async function updateStocks () {
  // loops through all user accounts and updates prev close
  // prices for each stocks
  // this should run every weekday
  const allStocks = await Stocks.find();
  for (let i = 0; i < allStocks.length; i++) {
    updateStock(allStocks[i].username);
  }
  console.log("-------------------");
}

setInterval(function () {updateStocks()}, 1 * 60 * 1000);