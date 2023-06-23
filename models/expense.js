const db = require('../util/database');

module.exports = class Expense {
  constructor(userId,amount, description, category) {
    this.userId=userId
    this.amount = amount;
    this.description = description;
    this.category = category;
  }

  save() {
    return db
      .execute(
        'INSERT INTO expenses (userId,expenseAmount, expenseDescription, expenseCategory) VALUES (?,?, ?, ?)',
        [this.userId,this.amount, this.description, this.category]
      )
      .then(([result]) => {
        console.log('Expense saved successfully.');
        return result.insertId;
      })
      .catch((error) => {
        console.log('An error occurred while saving the expense:', error);
        throw error;
      });
  }

  static fetchAll(user) {
    
    console.log(user)
    return db
      .execute('SELECT * FROM expenses where userId=?',[user.userId])
      .then(([rows, fieldData]) => {
        return rows;
      })
      .catch((error) => {
        console.log('An error occurred while fetching expenses:', error);
        throw error;
      });
  }
};
