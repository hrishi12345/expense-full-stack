const express = require('express');
const router = express.Router();
const Product = require('../models/menu');
const Expense = require('../models/expense');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.Password;
  const username = req.body.Username;
  const userId = Math.floor(Math.random() * 100);

  try {
    const userExists = await Product.fetchById(email);
    if (userExists) {
      res.status(302).send('User Exists');
    } else {
      await Product.signUp(email, password, username, userId);
      console.log('Sign up successful.');
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }

  res.redirect('/loginpage');
});



router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  try {
    const user = await Product.login(email, password);
    if (user) {
      const token = Product.generateToken(user.userId);
      res.status(200).json({ success: true, token });
      console.log('Login successful');
    } else {
      res.status(405).send('Invalid email or password');
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }
});
router.get('/loginpage', (req, res) => {
  res.sendFile('expenseLogin.html', { root: './views' });
});

router.get('/sign', (req, res) => {
  res.sendFile('expense.html', { root: './views' });
});

router.post('/addexpense', async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, '12590sdfkl');

// Access the decrypted token data
const userId = decodedToken.userId;
  
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.items;

  try {
    const expense = new Expense(userId,amount, description, category);
    await expense.save();
    console.log('Expense saved successfully.');
  } catch (error) {
    console.log('An error occurred while saving the expense:', error);
  }

  res.redirect('/addExpensePage');
});

router.get('/expenses', async (req, res) => {
  const id= req.headers.authorization
  req.user=id
  // Retrieve the token from local storage

// Decrypt the token
const decodedToken = jwt.verify(id, '12590sdfkl');

// Access the decrypted token data
const userId = decodedToken.userId;

// You can now use the userId in your code for further processing
const user={userId}

  try {
    const expenses = await Expense.fetchAll(user);
    res.json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/addExpensePage', (req, res) => {
  res.sendFile('addExpensePage.html', { root: './views' });
});

module.exports = router;