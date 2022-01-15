const usersRoutes = require('./users');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', usersRoutes);


  app.use('*', (req, res) => {
    res.status(404).json({ error: "page not found" });
  });
 
};

module.exports = constructorMethod;