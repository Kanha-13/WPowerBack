const ObjectId = require('mongodb').ObjectID
const gurdians = require('../models/guardians')
module.exports = {
  getGuardians: async (req, res) => {
    // console.log(req.body)
    res.status(200).send("alright")
    console.log("recieved")
    // res.status(200).json(await gurdians.find({ mobileNo: req.body.mobileNo }))
  },
  addGuardians: async (req, res) => {
    // console.log(req.body)
    res.status(200).send("alright")
    // res.status(200).json(await gurdians.find({ mobileNo: req.body.mobileNo }))
  },
}

