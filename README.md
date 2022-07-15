**OurCommunity backend**

This is a backend for mobile application `OurCommunity` (https://github.com/Kanha-13/WPowerFront).

- Which is an emergency mobile application built with react-native. Which send help signal or alert or message to the nearby ourcommunity member and the users gurdians and family and the sos service for example police and emergency service.

This backend authenticate and authorize users and after success opens a web-socket.

**To setup on local**

1. Clone the repo in your local machine.
2. `npm install` install the dependencies.
3. Create the following files in the root of this repo-

  1. `Secret.js`
  2. `API_KEY.js`

  **In secret.js paste this-**
  -  const secret = {
  email: "youremail",
  password: "password"
  }
  module.exports = secret;

  Create an email account to use nodemailer for email opt service. It would be recomended to crete an account on yahoo or outlook, because email may not work because of 2 factor authentication.

  **In API_KEY.js-**
  - const MONGO_API = "mongodb-uri"
  module.exports = MONGO_API

4. `nodemon` or `npm start`
  