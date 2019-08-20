const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

// const apps = require("./app");
const users = require("./routes/api/users");

const app = express();
app.use(cors());
/*    CORS Middleware         */
// const whitelist = ["http://sso-server-client.cloud.somulu.com:3020/"];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };
// app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//   var oneof = false;
//   if (req.headers.origin) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     oneof = true;
//   }
//   if (req.headers["access-control-request-method"]) {
//     res.header(
//       "Access-Control-Allow-Methods",
//       req.headers["access-control-request-method"]
//     );
//     oneof = true;
//   }
//   if (req.headers["access-control-request-headers"]) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       req.headers["access-control-request-headers"]
//     );
//     oneof = true;
//   }
//   if (oneof) {
//     res.header("Access-Control-Max-Age", 60 * 60 * 24 * 365);
//   }

//   // intercept OPTIONS method
//   if (oneof && req.method == "OPTIONS") {
//     res.send(200);
//   } else {
//     next();
//   }
// });

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
// app.use("/api/profile", profile);
// app.use("/api/posts", posts);

// Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const PORT = 8020;

app.listen(PORT, () => {
  console.info(`sso-server listening on port ${PORT}`);
});
