const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-crawling'

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes);

const server = app.listen(PORT, () => console.log(`Server is listening on: http://localhost:${PORT}`));