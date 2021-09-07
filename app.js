const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes');

const db = require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bc', express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(routes);

const server = app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));

server.on('error', err => console.error('Error in listening:\n', err.message));
server.on('request', (req, res) => handleRequest(req, res));

const handleRequest = (req, res) => {
  const { url, header } = req;

  console.log({url, header})
}