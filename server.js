const express = require("express");
const path = require("path");
const axios = require("axios");
const mysql=require('mysql')
const app = express();
const bcrypt = require('bcryptjs');
const cors=require('cors')
const port = 8080;
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "", // Replace with your MySQL password
    database: 'farm_assistant'
  });

  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

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


// ✅ Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve login and signup pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "newlogin.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "signup.html"));
    
});

// ✅ Redirect logout to login page
app.get("/logout", (req, res) => {
    res.redirect("/");
});

// ✅ Serve all main pages under "/main/"
app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "main.html"));
});

app.get("/main/market", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "market.html"));
});

// app.get("/main/news", async (req, res) => {
//     try {
//         const q = req._parsedUrl.query;
//         console.log("News Query:", q);
//         const url = `https://newsapi.org/v2/everything?${q}&apiKey=YOUR_NEWS_API_KEY`; // ✅ Replace with your API key
//         const response = await axios.get(url);
//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching news:", error);
//         res.status(500).json({ error: "Failed to fetch news" });
//     }
// });
app.get("/main/news", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "Govscheme.html"));

});

// ✅ Create a separate API endpoint for fetching news
app.get("/main/news/api", async (req, res) => {
    const q = req._parsedUrl.query
    console.log(q)
    const url = `https://newsapi.org/v2/everything?`+q;
    // +`&apiKey=4cf5fbfebd1d46078404320528628a3f`
    let r = await axios(url)
    let a = r.data
    res.json(a)
});
app.get("/main/famer", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "famer.html"));
});

app.get("/main/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "cart.html"));
});

app.get("/main/aboutus", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "aboutus.html"));
});

// ✅ Redirect all unknown routes to login (logout protection)
app.use((req, res, next) => {
    if (!req.url.startsWith("/main")) {
        res.redirect("/main");
    } else {
        next();
    }
});

// ✅ Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
