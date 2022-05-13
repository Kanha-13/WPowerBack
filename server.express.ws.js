const express = require('express');
const app = express();
// const server = require('http').createServer(app);
const mongoose = require('mongoose');
const ws = require('ws');

const API = process.env.MONGO_API || require('./API_KEY');
const PORT = process.env.PORT || 1310;

// const incommingLocation = require("./routes/incommingLocation");
// const connection = require('./routes/connection');
// const contactconnection = require('./routes/contactconnection');
// const userProfile = require('./routes/handelUserProfile');
// const helpCall = require('./routes/helpCall')
// const iamsafe = require('./routes/iamsafe')
const Cors = require('cors');



//routes
const gurdians = require('./routes/UserSpecificRoutes/guardian');
const signup = require('./routes/signup');

const connection_url = API;
let helpRequests = []
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

//ws instance
const wsServer = new ws.Server({ noServer: true });


wsServer.broadcast = function broadcast(msg) {
  wsServer.clients.forEach(function each(client) {
    client.send(msg);
  });
}


wsServer.on('connection', socket => {
  socket.on('message', message => {
    try {
      const eventName = JSON.parse(message).eventName
      console.log(eventName)
      if (eventName === "helpMe") {
        helpRequests.push(message)
        console.log(helpRequests)
        wsServer.broadcast(helpRequests)
        console.log("I got help request")
        console.log(`and payload is `, JSON.parse(message).payload)
      } else if (eventName === "iAmSafe") {
        console.log("this person is safe now")
        console.log(`and payload is `, JSON.parse(message).payload)
      }
    } catch (error) {
      console.log(error)
    }
  });
});


//middlewares
// app.use(express.static(__dirname))
app.use(Cors({ origin: "*" }));
app.use(express.json());
// app.use(cookieParser());

// setTimeout(() => {
//   wsServer.emit('helpMe', { a: 1, b: 2 });
// }, 2000);

// wsServer.addListener("helpMe", (data) => {
//   console.log(data)
// })


//api end points
app.get('/', (req, res) => {
  res.send("Server running...")
})
app.use(gurdians)
app.use(signup)

//listener
const server = app.listen(PORT, () => console.log(`Server Listening running at ${PORT}`));

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});