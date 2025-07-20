const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
} 
const port = 80;

// define mongoose schema 
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  adress: String,
  desc: String
});

const contact = mongoose.model('contact', contactSchema);


// express specific stuff 
app.use('/static', express.static('static'))
  // for serving static file 
app.use(express.urlencoded())

// pug specific stuff 
app.set('view engine', 'pug') // set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // set the views directory

// end points 
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
  var myData  = new contact(req.body);
  myData.save().then(()=>{
    res.send("this item has been saved to the database")
  }).catch(()=>{
    res.status(400).send=("this item has not been saved to the database")
  });
  // res.status(200).render('contact.pug');
})


// server startup 
app.listen(port, () => {
    console.log(`this app is successfully started in port ${port}`)
})