const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/books');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(routes);
app.use(express.static(__dirname + '/frontend'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


app.listen(port, () => {
  console.log('App listening on port http://localhost:3000');
});

