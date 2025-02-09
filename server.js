const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const port = 8080;

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
app.get("/api/news", async (req, res) => {
    try {
        const q = req.query.q || "agriculture"; // Default topic: agriculture
        const pageSize = req.query.pageSize || 10;
        const pageno = req.query.pageno || 1;
        // const apiKey = 'your_api_key_here';
        const url = `https://newsapi.org/v2/everything?`+q;
        console.log("Fetching News from:", url);
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
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
