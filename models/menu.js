const db = require('../util/database');
const jwt = require('jsonwebtoken');

module.exports = class Menu {
  constructor(email, password, username, userId) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.userId = userId;
  }

  static fetchById(email) {
    return db
      .execute('SELECT * FROM users WHERE email = ?', [email])
      .then(([rows, fieldData]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log('An error occurred while fetching user by ID:', error);
        throw error;
      });
  }

  static signUp(email, password, username, userId) {
    return db
      .execute('INSERT INTO users (email, password, username, userId) VALUES (?, ?, ?, ?)', [email, password, username, userId])
      .then(([result]) => {
        console.log('User saved successfully.');
        return result.insertId;
      })
      .catch((error) => {
        console.log('An error occurred while saving the user:', error);
        throw error;
      });
  }

  static login(email, password) {
    return db.execute('SELECT * FROM users WHERE email=? AND password=?', [email, password])
      .then(([rows, fieldData]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log('An error occurred while performing login:', error);
        throw error;
      });
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, '12590sdfkl', { expiresIn: '1h' });
  }
};
