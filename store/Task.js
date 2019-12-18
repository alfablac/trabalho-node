const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
    listChave: {
        type: String
    },
    taskName: {
        type: String
    },
    status: {
        type: Boolean
    }
})

const Task = mongoose.model('Task', tasksSchema)
module.exports = Task
