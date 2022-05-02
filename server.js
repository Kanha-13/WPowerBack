const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const API = process.env.MONGO_API || require('./API_KEY');
const PORT = process.env.PORT || 1312;
const incommingLocation = require("./routes/incommingLocation");
const connection = require('./routes/connection');
const contactconnection = require('./routes/contactconnection');
const userProfile = require('./routes/handelUserProfile');
const helpCall = require('./routes/helpCall')
const iamsafe = require('./routes/iamsafe')
const Cors = require('cors');



//routes
const gurdians = require('./routes/UserSpecificRoutes/guardian');
const signup = require('./routes/signup');

const connection_url = API;

//mongo connection 
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to DB")
}).catch(err => {
  console.log(err)
})
exports = io = require('socket.io')(server, { cors: { origin: "*" }, });

//new connection
io.on('connection', (socket) => {
  // const connectitonFrom = socket.handshake.query.user
  connection(socket)
  incommingLocation(socket)
  contactconnection(socket)
  userProfile(socket)
  helpCall(socket, io)
  iamsafe(socket)
});

//middlewares
// app.use(express.static(__dirname))
app.use(Cors({ origin: "*" }));
app.use(express.json());
// app.use(cookieParser());


//api end points
app.get('/', (req, res) => {
  res.send("Server running...")
})
app.use(gurdians)
app.use(signup)
//listener
server.listen(PORT, () => console.log(`Server is listening at localhost:${PORT}`));