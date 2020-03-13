const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
// connect to database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB CONNECTED"))
  .catch(err => console.log("DB ERROR : ", err));

// extra code for heroku
app.use(function(req, res, next) {
res.header(“Access-Control-Allow-Origin”, “*”);
res.header(“Access-Control-Allow-Methods”, “GET,PUT,POST,DELETE”);
res.header(
“Access-Control-Allow-Headers”,
“Origin, X-Requested-With, Content-Type, Accept”
);
next();
});
app.options(“*”, cors());
// end of extra code for heroku

app.use(express.static(environmentRoot + '/public'));


// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(cors()); //allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `https://auth-app-praveen.herokuapp.com/` }));
}



// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`);
});
