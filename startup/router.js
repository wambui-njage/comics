const express = require('express');
const comics = require('../routes/comics');
const creators = require('../routes/creators');
// const movies = require('../routes/movies');
// const rentals = require('../routes/rentals');
// const users = require('../routes/users');
// const auth = require('../routes/auth');
// const returns = require('../routes/returns');
// const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/comics', comics);
  app.use('/api/creators', creators);
//   app.use('/api/movies', movies);
//   app.use('/api/rentals', rentals);
//   app.use('/api/users', users);
//   app.use('/api/auth', auth);
//   app.use('/api/returns', returns);
//   app.use(error);
}