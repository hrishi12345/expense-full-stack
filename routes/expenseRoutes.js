const express = require('express');
const router = express.Router();
const Product = require('../models/menu');
router.post('/signup', async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.Password;
    const username = req.body.Username;
  
    try {
      const userExists = await Product.fetchById(email);
      if (userExists) {
        console.log('User exists');
      } else {
        await Product.signUp(email, password, username);
        console.log('Sign up successfully.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  
    res.redirect('/');
  });
  

router.get('/', (req, res) => {
  res.sendFile('expense.html', { root: './views' });
});

module.exports = router;
