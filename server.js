const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://todo:todo@ds161873.mlab.com:61873/todo', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  var cursor = db.collection('quotes').find().toArray(function(err, results) {
  if (err) return console.log(err)
    // renders index.ejs
    console.log(results)
    res.render('index.ejs', {quotes: results})
  })
})

app.get('/happy', (req, res) => {
 res.sendFile(__dirname + '/index.html')
})

app.post('/content', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
