const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require('cors');
const session = require("express-session");
const config = require("./config-local.json");

let app = express();

const movieRouter = require("./modules/api/movies/router");
const listRouter = require("./modules/api/listfavor/router");
const TVRouter = require("./modules/api/TVseries/router");
const authRouter = require("./modules/api/auth/router");
const userRouter = require("./modules/api/user/router");

// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );

  if (req.headers.origin) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");


  res.setHeader("Access-Control-Allow-Credentials", true);

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect(config.mongoPath, err => {
  if (err) console.error(err);
  else console.log("Database connect successful");
});

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.secureCookie,
      maxAge: 12 * 60 * 60 * 1000
    }
  })
);
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json({ extended: false }));


app.use("/api/movies", movieRouter);
app.use("/api/listfavor", listRouter);
app.use("/api/tv", TVRouter);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
// app.use("/api/login", loginFB);

app.get("/", (req, res) => {
  res.send("Homepage connect successful!");
});

// const port =  6969;
const port = process.env.PORT || 6969;

app.listen(port, err => {
  if (err) console.log(err);
  console.log("Server listening at port "+port);
});