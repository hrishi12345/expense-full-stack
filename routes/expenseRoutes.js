const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  console.log(req.body);
  res.send('Sign Up Successful');
});

router.get('/', (req, res) => {
  res.sendFile('expense.html', { root: './views' });
});

module.exports = router;
