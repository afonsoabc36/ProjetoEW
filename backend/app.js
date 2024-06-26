var path = require("path");
var cors = require("cors");
require("dotenv").config();
var logger = require("morgan");
var express = require("express");
var createError = require("http-errors");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");

var app = express();

app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

connectDB();

const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const UCsRouter = require("./routes/UCsRouter");

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, path, stat) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/UCs", UCsRouter);
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
