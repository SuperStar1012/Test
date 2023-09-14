const mongoose = require('mongoose');

const sectorSchema = mongoose.Schema({
   sector: {type: String},
   rank: {type: Number}
})

const sectorModel = mongoose.model('sectors', sectorSchema)

module.exports = sectorModel;