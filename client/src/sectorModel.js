import mongoose from 'mongoose'

const sectorSchema = mongoose.Schema({
    sector: String
})

const sectorModel = mongoose.model('sectors', sectorSchema)
export default sectorModel