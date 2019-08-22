const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const apps = require("./app");
const users = require("./routes/api/users");

const app = express();
app.use(cors());

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
// mongoose
//   .connect(db, { useNewUrlParser: true }) // Let us remove that nasty deprecation warrning :)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));
mongoose.connect(db, { useNewUrlParser: true });
/* Session is added */
app.use(
  session({
    secret: "abcdefgh",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: new MongoStore({
      url: db,
      collection: "session"
    })
  })
);
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
