const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

const api = require('./routes/api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/openai', api);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
