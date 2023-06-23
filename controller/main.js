const Product = require('../models/menu');
exports.postAddProduct = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const orderId = req.params.orderId;
    if (orderId) {
      // Update an existing order
      Product.updateOrder(orderId, dish, amount, table)
        .then(() => {
          console.log('Order updated successfully.');
          res.redirect('/');
        })
        .catch((error) => {
          console.log('An error occurred while updating the order:', error);
          res.redirect('/');
        });
    } else {
      // Add a new order
      const product = new Product(dish, amount, table);
  
      product.save()
        .then(() => {
          console.log('Order added successfully.');
          res.redirect('/');
        })
        .catch((error) => {
          console.log('An error occurred while saving the order:', error);
          res.redirect('/');
        });
    }
  };