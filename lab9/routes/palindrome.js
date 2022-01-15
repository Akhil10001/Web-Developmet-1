const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('palindrome/palindrome', {});
});





module.exports = router;