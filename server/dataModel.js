const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
   sector: {type: String},
   name: {type: String}
})

const dataModel = mongoose.model('datas', dataSchema)

module.exports = dataModel;