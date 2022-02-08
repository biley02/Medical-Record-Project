// Require express and create an instance of it
const http = require("http");
var express = require("express");
const path = require("path");
const cors = require("cors");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const connect_flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const User = require("../medical-record-api/models/User");
const Hospital = require("../medical-record-api/models/Hospital");
const Relation = require("../medical-record-api/models/Relations");
var app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cookieParser());

const link = "http://localhost:3000";

app.use(cors({ origin: link, credentials: true }));

// app.use(express.static('public'))

// using dotenv module for environment
require("dotenv").config();

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongo server"))
  .catch((err) => console.error(err));

const publicDirectory = path.join(__dirname, "../public");
// console.log(publicDirectory);
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");
const hospitalRoutes = require("./routes/hospital");
const universityRoutes = require("./routes/university");
const doctorRoutes = require("./routes/doctor");
const conversationRoute = require("./chatRoutes/conversation");
const messageRoute = require("./chatRoutes/messages");
app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/university", universityRoutes);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

// app.use("/", indexRoutes);
// app.use("/user", userRoutes);
// app.use("/hospital", hospitalRoutes);
app.use("/doctor", doctorRoutes);

// start the server in the port 3000 !
server.listen(port, function () {
  console.log("Example app listening on port :", port);
});

// const deleteUser = async (req, res) => {
//   const user = await User.find({});
//   user.map(async (data) => {
//     await User.findByIdAndDelete({ _id: data._id });
//   });
//   console.log("deleted user");
// };

// const deleteHospital = async (req, res) => {
//   const user = await Hospital.find({});
//   user.map(async (data) => {
//     await User.findByIdAndDelete({ _id: data._id });
//   });
//   console.log("deleted hospital");
// };

// const deleteRelation = async (req, res) => {
//   const user = await Relation.find({});
//   user.map(async (data) => {
//     await User.findByIdAndDelete({ _id: data._id });
//   });
//   console.log("deleted Relations");
// };

// deleteUser();
// deleteHospital();
// deleteRelation();
