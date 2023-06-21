const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const expenseRoutes = require('./routes/expenseRoutes');
app.use('/', expenseRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
