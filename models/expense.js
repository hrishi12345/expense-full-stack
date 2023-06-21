const db=require('../util/database')
module.exports=class Expense{
    constructor(amount,description,category){
    this.amount=amount
    this.description=description
    this.category=category
    }
    save(){
        return db
        .execute('Insert into expenses(amount,description,category) values (?,?,?)',[this.amount,this.description,this.category])
        .then(([result]) => {
            console.log('Product saved successfully.');
            return result.insertId;
          })
          .catch((error) => {
            console.log('An error occurred while saving the product:', error);
            throw error;
          });}
          static addExpense(email, username, password) {
            const product = new Expense(email, username, password);
            return product.save();
          }
          static fetchAll() {
            return db
              .execute('SELECT * FROM expenses')
              .then(([rows, fieldData]) => {
                console.log(rows);
                return rows;
              })
              .catch((error) => {
                console.log('An error occurred while fetching products:', error);
                throw error;
              });
          }
        
}