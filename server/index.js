const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dataBaseURL = "mongodb://localhost:27017/Test"
const sectorModel = require('./sectorModel');
const dataModel = require('./dataModel');

const app = express();

// try{
//   mongoose.connect(dataBaseURL);
//   console.log("connected db successfully")
// } catch(error)
// {
//   console.log(error)
// }

mongoose.connect('mongodb://0.0.0.0:27017/Test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.get('/', async (req, res) => {
  sectorModel.find()
    .then((data) => {
      res.json(data)

    })
})
app.get('/getSavedData', async (req, res) => {
  dataModel.find()
    .then((data) => {
      res.json(data)

    })
})
app.post('/saveData', async (req, res) => {
  const data = { name: req.body.name, sector: req.body.sector }
  const newDataModel = new dataModel(data);
  newDataModel.save()
  dataModel.find()
    .then((data) => {
      res.json(data)
    })
})

app.post('/editData', async (req, res) => {
  console.log(req.body);
  try {
    const data = await dataModel.findById(req.body.changeID);
    if (data) {
      data.name = req.body.name;
      data.sector = req.body.sector;
      await data.save();
    }
    const updatedData = await dataModel.find();
    console.log(updatedData);
    res.json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});