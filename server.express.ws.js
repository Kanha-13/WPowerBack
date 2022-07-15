const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ws = require('ws');
const fs = require("fs");
const API = process.env.MONGO_API || require('./API_KEY');
const PORT = process.env.PORT || 1310;
const Cors = require('cors');

const signup = require('./routes/signup');
const user = require('./routes/user');

//ws instance
const wsServer = new ws.Server({ noServer: true });



const getAllHelpReq = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./AllHelpRequests.json", "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(JSON.parse(data));
    });
  });
}

const updateTheFile = (updatedData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./AllHelpRequests.json', JSON.stringify(updatedData), function writeJSON(err) {
      if (err) return reject(err);
      return resolve("Updated successfully")
    });
  });
}

const callbackAfterRead = (helpRequests, data) => {
  // const helpReqIndex = helpRequests.findIndex(req => req.phoneNumber === data.userData.phoneNumber);
  if (helpRequests[data.userData.phoneNumber]) {
    helpRequests[data.userData.phoneNumber].cords = data.cords
  } else {
    helpRequests[data.userData.phoneNumber] = {
      phoneNumber: data.userData.phoneNumber,
      cords: data.cords,
      // address: data.address
    }
  }
  updateTheFile(helpRequests).then(() => {
    wsServer.broadcast({ needYourHelp: helpRequests })
  }).catch((error) => console.log(error))
}

wsServer.broadcast = function broadcast(payload) {
  const allRequests = JSON.stringify(payload)
  wsServer.clients.forEach(function each(client) {
    client.send(allRequests);
  });
}



const updateUserHelpRequest = (data) => {//need to optimize this function
  getAllHelpReq().then((helpRequests) => {
    callbackAfterRead(helpRequests, data)
  }).catch((error) => {
    console.log(error)
  })
}

const connection_url = API;
let helpRequests = []

//mongo connection 
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to DB")
}).catch(err => {
  console.log(err)
})

wsServer.on('connection', socket => {
  socket.on('message', message => {
    try {
      const eventName = JSON.parse(message).eventName
      if (eventName === "helpMe") {
        const payloadData = JSON.parse(message).payload
        updateUserHelpRequest(payloadData)
      } else if (eventName === "iAmSafe") {
        wsServer.broadcast({
          thisPersonIsSafeNow: {
            cords: JSON.parse(message).payload.cords,
            phoneNumber: JSON.parse(message).payload.phoneNumber
          }
        })
        console.log("this person is safe now")
        console.log(`and payload is `, JSON.parse(message).payload)
      }
    } catch (error) {
      console.log(error)
    }
  });
});


//middlewares
app.use(Cors({ origin: "*" }));
app.use(express.json());
// app.use(cookieParser());


//api end points
app.get('/', (req, res) => {
  res.send("Server running...")
})
app.use(signup)
app.use(user)

//listener
const server = app.listen(PORT, () => console.log(`Server Listening running at ${PORT}`));

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});