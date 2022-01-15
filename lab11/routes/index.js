const TvshowsRoutes = require('./Tvshows');

const constructorMethod = (app) => {
  app.use('/', TvshowsRoutes);

  app.use('*', (req, res) => {
    res.json({error:"page not found"});
  });
};

module.exports = constructorMethod;