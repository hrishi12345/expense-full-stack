const express = require('express');
const router = express.Router();
const Product = require('../models/menu');

router.post('/signup', async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  try {
    const userExists = await Product.fetchById(email);
    if (userExists) {
      res.status(302).send('User Exists')
    } else {
      await Product.signUp(email, password, username);
      console.log('Sign up successful.');
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }

  res.redirect('/');
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.Password;

  try {
    const userExists = await Product.fetchById(email);
    if (userExists) {
      const loginSuccessful = await Product.login(email, password);
      if (loginSuccessful) {
        console.log('Login successful');
      } else {
        res.status(405).send('Invalid email or password');
      }
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }


});

router.get('/', (req, res) => {
  res.sendFile('expense.html', { root: './views' });
});

router.get('/loginpage', (req, res) => {
  res.sendFile('expenseLogin.html', { root: './views' });
});

module.exports = router;
