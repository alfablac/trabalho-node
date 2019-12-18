const mongoose = require('mongoose');
const connectionString = 'XXXXXXXXXXXXXXXXXXXX'

const openConnection = () => mongoose.connect(connectionString, { useNewUrlParser: true })

module.exports = {
    openConnection,
}