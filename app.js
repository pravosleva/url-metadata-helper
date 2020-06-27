var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

console.log(process.env.RECAPTCHAV3_VERIFY_URL);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var urlMetadataRouter = require("./routes/url-metadata");
var reCAPTCHAV3Router = require("./routes/recaptcha-v3");
var swaggerRouter = require("./routes/swagger");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/url-metadata", urlMetadataRouter);
app.use("/recaptcha-v3", reCAPTCHAV3Router);
app.use("/swagger", swaggerRouter);

module.exports = app;