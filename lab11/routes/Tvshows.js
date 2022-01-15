const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('Tvshows/Tvshows', {});
});





module.exports = router;