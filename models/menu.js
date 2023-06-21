const db=require('../util/database')
module.exports=class Product{
    constructor(email,username,password){
        this.email=email
        this.username=username
        this.password=password
    }
    save() {
        return db
          .execute('INSERT INTO email (email, username, password) VALUES (?, ?, ?)', [
            this.email,
            this.username,
            this.password,
          ])
          .then(([result]) => {
            console.log('Product saved successfully.');
            return result.insertId;
          })
          .catch((error) => {
            console.log('An error occurred while saving the product:', error);
            throw error;
          });}
          static signUp(email, username, password) {
            const product = new Product(email, username, password);
            return product.save();
          }
          static login(email, password) {
            return db.execute('SELECT email, password FROM email WHERE email=? AND password=?', [email, password])
              .then(([rows, fieldData]) => {
                if (rows.length > 0) {
                  
                  return true;
                } else {
                  res.status(401).send('User not Found')
                  return false;
                }
              })
              .catch((error) => {
                console.log('An error occurred while performing login:', error);
                throw error;
              });
          }
          
          static fetchById(email) {
            return db.execute('SELECT EMAIL FROM email WHERE email=?', [email])
              .then(([rows, fieldData]) => {
                if (rows.length > 0) {
                  console.log('User exists');
                  return true;
                } else {
                  res.status(404).send('User does not exist');
                  return false;
                }
              })
              .catch((error) => {
                console.log('An error occurred while fetching user by ID:', error);
                throw error;
              });
          }
          
        
        
    
}