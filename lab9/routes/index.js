const palindromeRoutes = require('./palindrome');

const constructorMethod = (app) => {
  app.use('/', palindromeRoutes);

  app.use('*', (req, res) => {
    res.json({error:"page not found"});
  });
};

module.exports = constructorMethod;