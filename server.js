const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const cors = require('cors')
const util = require("util");
const multer = require("multer");
const port = 8080;
const mysql = require('mysql')
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "9321675524@j", // Replace with your MySQL password
    database: 'data'
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


app.use(express.static("uploads")); // Serve uploaded files

// Create 'uploads' folder if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: "uploads/", // Save files in "uploads/" directory
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage: storage });

// ✅ Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "newlogin.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "signup.html"));

});



app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "main.html"));
});




app.get("/logout", (req, res) => {
    res.redirect("/");
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

app.get("/main/news/api", async (req, res) => {
    const q = req._parsedUrl.query
    console.log(q)
    const url = `https://newsapi.org/v2/everything?` + q;
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

// app.use((req, res, next) => {
//     if (!req.url.startsWith("/main")) {
//         res.redirect("/main");
//     } else {
//         next();
//     }
// });



//signup form
app.post('/signup', async (req, res) => {

    // Convert connection.query to a Promise-based function
    const query = util.promisify(connection.query).bind(connection);

    //declare local variable to store copy of inserted data
    var user_name = req.body.user_name;
    var email = req.body.email;
    var mobile_no = req.body.mobile_no;
    var user_pass = req.body.user_pass;
    var address = req.body.address;
    var city = req.body.city;
    var business_type = req.body.business_type;

    try {   // apply logic here as you want


        // Insert into the user table first
        const sql_user = "INSERT INTO user (user_name, email, mobile_no, user_pass) VALUES(?, ?, ?, ?)";
        await query(sql_user, [user_name, email, mobile_no, user_pass], (err) => {
            if (err) {

                res.send("registration  unsuccessfull...")
            }

            res.redirect("/main");

        });



        // // Insert into the business_user table
        // const sql_business = "INSERT INTO business_user (address, city, business_type) VALUES (?, ?, ?)";
        // await query(sql_business, [address, city, business_type],(err,result)=>{
        //     if(err){
        //        // res.redirect("/main");  //redirect main page
        //         res.send("registration unsuccessfull...")
        //     }
        // }   );




        // If both inserts are successfull

    } catch (err) {
        // 
        console.error("Error during registration:", err);

    }


})





//login form
app.post("/", (req, res) => {

    var user_name = req.body.user_name;
    var user_pass = req.body.user_pass;


    const sql = "SELECT * FROM user WHERE user_name=? AND user_pass=?";
    connection.query(sql, [user_name, user_pass], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length > 0) {
            res.redirect("/main"); // Success: redirect to main page
        } else {
            res.send("Invalid login credentials"); // No user found
        }
        // if(err){
        //     console.error(err);
        //     res.send("invalid login credentials")

        // }
        // console.log(result);
        // res.redirect("/main")

    })
})

app.use("/uploads", express.static("uploads"));


// app.post('/add-crop', upload.single('crop_image_file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "Image upload failed" });
//     }

//     // Save crop details in DB with image path
//     const cropData = {
//         crop_name: req.body.crop_name,
//         crop_description: req.body.crop_description,
//         crop_price: req.body.crop_price,
//         crop_image: `/uploads/${req.file.filename}` // Store the correct path
//     };

//     // Insert cropData into your database here
//     res.json(cropData); // Send back crop details including the image path
// });

app.post('/add-crop', upload.single('crop_image_file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Image upload failed" });
    }

    // Save crop details
    const cropData = {
        crop_name: req.body.crop_name,
        crop_description: req.body.crop_description,
        crop_price: req.body.crop_price,
        crop_image: `/uploads/${req.file.filename}`
    };

    // Insert into database here (Assuming successful)
    res.json({ success: true, message: "Crop added successfully!", crop: cropData });
});





// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

































app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// const express = require("express");
// const path = require("path");
// const axios = require("axios");
// const mysql = require("mysql");
// const util = require("util");
// const bcrypt = require("bcrypt");
// const bodyparser = require("body-parser");

// const app = express();
// const port = 8080;

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "9321675524@j",
//     database: "data"
// });

// connection.connect((error) => {
//     if (error) {
//         console.error("Database connection failed:", error);
//         process.exit(1);
//     } else {
//         console.log("Connected to database successfully!");
//     }
// });

// // Convert connection.query to promise-based function
// const query = util.promisify(connection.query).bind(connection);

// // Routes
// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "newlogin.html")));
// app.get("/signup", (req, res) => res.sendFile(path.join(__dirname, "views", "signup.html")));
// app.get("/main", (req, res) => res.sendFile(path.join(__dirname, "views", "main.html")));
// app.get("/logout", (req, res) => res.redirect("/"));
// app.get("/main/market", (req, res) => res.sendFile(path.join(__dirname, "views", "market.html")));
// app.get("/main/news", (req, res) => res.sendFile(path.join(__dirname, "views", "Govscheme.html")));
// app.get("/main/famer", (req, res) => res.sendFile(path.join(__dirname, "views", "famer.html")));
// app.get("/main/cart", (req, res) => res.sendFile(path.join(__dirname, "views", "cart.html")));
// app.get("/main/aboutus", (req, res) => res.sendFile(path.join(__dirname, "views", "aboutus.html")));

// // Redirect invalid routes
// // app.use((req, res, next) => {
// //     if (!req.url.startsWith("/main")) {
// //         res.redirect("/main");
// //     } else {
// //         next();
// //     }
// // });

// // User Signup (Register)
// app.post('/signup', async (req, res) => {
//     try {
//         const { user_name, email, mobile_no, user_pass, address, city, business_type } = req.body;

//         // Hash password before storing in DB
//         const hashedPassword = await bcrypt.hash(user_pass, 10);

//         // Insert into user table
//         const sql_user = "INSERT INTO user (user_name, email, mobile_no, user_pass) VALUES (?, ?, ?, ?)";
//         await query(sql_user, [user_name, email, mobile_no, hashedPassword]);

//         // Insert into business_user table
//         const sql_business = "INSERT INTO business_user (address, city, business_type) VALUES (?, ?, ?)";
//         await query(sql_business, [address, city, business_type]);

//         console.log("User registered successfully!");
//         res.redirect("/main");
//     } catch (error) {
//         console.error("Error during registration:", error);
//         res.status(500).send("Registration unsuccessful...");
//     }
// });

// // User Login
// app.post("/", async (req, res) => {
//     try {
//         const { user_name, user_pass } = req.body;

//         // Fetch user from database
//         const sql = "SELECT * FROM user WHERE user_name = ?";
//         const users = await query(sql, [user_name]);

//         if (users.length === 0) {
//             return res.send("Invalid login credentials");
//         }

//         const user = users[0];

//         // Compare hashed password
//         const isMatch = await bcrypt.compare(user_pass, user.user_pass);
//         if (!isMatch) {
//             return res.send("Invalid login credentials");
//         }

//         res.redirect("/main");
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Start Server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
