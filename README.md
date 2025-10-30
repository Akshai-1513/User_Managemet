<img width="888" height="629" alt="image" src="https://github.com/user-attachments/assets/853b2009-6f61-498c-a2b2-ba6190a4f0cb" />1️⃣ Clone this repository :

    git clone https://github.com/YOUR_USERNAME/User_Managemet.git
    cd User_Managemet

2️⃣ Install dependencies :

    npm init 
    npm install npm install express ejs body-parser mysql2
    npm install nodemon --save-dev


3️⃣ Configure the database

    Inside config/db.js, update your MySQL credentials:

        const mysql = require('mysql2');
        const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'YOUR_PASSWORD',
        database: 'YOUR_DATABASE_NAME',
        multipleStatements: true
        });

        db.connect(err => {
        if (err) console.error('MySQL connection failed:', err.message);
        else console.log('MySQL connected successfully!');
        });

        module.exports = db;



📦 Database Setup

    Run these SQL commands in MySQL:

        CREATE DATABASE user_management;

        use user_management;

        create table users(
            id int primary key auto_increment,
            name varchar(250) not null,
            age int not null,
            gender enum('male', 'female') not null
        );


🧑‍💻 API Endpoints
    Method	Endpoint	Description
    GET  	/users	    Get all books
    GET	    /users/:id	Get a book by ID
    POST	/users	    Add a new book
    PUT	    /users/:id	Update a book
    DELETE	/users/:id	Delete and reorder IDs


🧪 Example JSON (POST /books)
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "year": 1988
}


⚡ Run the Server
node node.js


Then open Postman and test the routes at:

http://localhost:3000/books
