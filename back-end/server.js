const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer');

const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
    }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
  name: String,
  path: String,
  description: String,
  medals: String,
});

const Athlete = mongoose.model('Athlete', athleteSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/athletes', {
  useNewUrlParser: true
});

app.get('/api/athletes', async (req, res) => {
  try {
    let athletes = await Athlete.find();
    res.send(athletes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/athletes', async (req, res) => {
  const athlete = new Athlete({
    name: req.body.name,
    path: req.body.path,
    description: req.body.description,
    medals: req.body.medals,
  });
  try {
    await athlete.save();
    res.send(athlete);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.delete('/api/athletes/:id', async (req,res) => {
  try{
    await Athlete.deleteOne({
      _id: req.params.id,
    });
    res.sendStatus(200);
  } catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/athletes/:id', async (req,res) => {
  try{
    let athlete = await Athlete.findOne({
      _id: req.params.id,
    });
    athlete.name = req.body.name;
    athlete.description = req.body.description;
    athlete.medals = req.body.medals;
    await athlete.save();
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
