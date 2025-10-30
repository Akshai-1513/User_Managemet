const express = require("express"); //imporrt the express module
const db = require("./config/db"); // import the db module from config folder.

const app = express(); // create an express application
app.use(express.json()); //middleware to parse JSON request bodies

//get all the data about the table.
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//get the data based on the user id
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users where id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});

//create a new usew in the database
app.post("/users", (req, res) => {
  const { name, age, gender } = req.body;
  if (!name || !age || !gender)
    return res.status(400).json({ error: "All fields are requied" });

  const sql = "INSERT INTO users (name, age, gender) values (?, ?, ?)";
  db.query(sql, [name, age, gender], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, name, age, gender });
  });
});

//update the user based on the user id
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, gender } = req.body;

  const sql = "update users set name = ? , age = ? , gender = ? where id = ?";
  if (!name || !age || !gender)
    return res.status(400).json({ error: "All fields are required" });
  db.query(sql, [name, age, gender, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ id, name, age, gender });
  });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id= ? ";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "user not found" });
    // res.json({ message: 'User deleted successfully' });

    const sqlReorder = `
      SET @count = 0;
      UPDATE users SET id = (@count := @count + 1);
      ALTER TABLE users AUTO_INCREMENT = 1;
    `;

    db.query(sqlReorder, (err2) => {
      if (err2)
        return res
          .status(500)
          .json({ error: "Users deleted but failed to reorder IDs" });
      res.json({ message: "User deleted and IDs reordered successfully" });
    });
  });
});

app.listen(3000, () => console.log("Server running on the port 3000"));
