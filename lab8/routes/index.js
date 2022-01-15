const pagesRoutes = require('./pages');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/', pagesRoutes);
  app.use('/search', pagesRoutes);


  app.use('*', (req, res) => {
    res.status(404).json({ error: "page not found" });
  });
 
};

module.exports = constructorMethod;