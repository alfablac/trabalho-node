const mongoose = require('mongoose')

const listsSchema = new mongoose.Schema({
    userID: {
        type: Number
    },
    listName: {
        type: String
    },
})

const List = mongoose.model('List', listsSchema)
module.exports = List
