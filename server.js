const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "", // Replace with your MySQL password
  database: 'farm_assistant'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Signup API
app.post('/api/signup', (req, res) => {
  const { fullname, email, mobile, password, address, city, business_type } = req.body;

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const query = `
    INSERT INTO users (fullname, email, mobile, password, address, city, business_type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [fullname, email, mobile, hashedPassword, address, city, business_type], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }
    res.json({ message: 'User registered successfully' });
  });
});

// Login API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    // Compare passwords
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful', user });

  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});