const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'student_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/api/students', (req, res) => {
  const { rollNo, name, department, semester, college } = req.body;
  
  const sql = 'INSERT INTO students (rollNo, name, department, semester, college) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [rollNo, name, department, semester, college], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return;
    }
    console.log('Student data inserted successfully');
    res.json({ success: true, message: 'Student data inserted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
