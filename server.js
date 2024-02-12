const express = require("express");
const mysql = require("mysql");

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gingermedia"
});


// SingUp API

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO authentication (`name`, `email`, `password`) VALUES (?,?,?)"; // Fixed the SQL query
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("error");
        }
        return res.json(data);
    });
});




// Login API

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM authentication where `email` = ? AND `password` = ?"; // Fixed the SQL query
   
    db.query(sql, [ req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("error");
        }
        if(data.length > 0)
        {
            return res.json("Success");
        }
        else{
            return res.json("Fail");
        }
    });
});



// getUserDetails


app.get('/login', (req, res) => {
    const sql = "SELECT * FROM authentication";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("error");
        } else {
            return res.json(data);
        }
    });
});



//putUserDetails

app.put('/login/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, password,age,contact,dob,address, } = req.body;
    const sql = "UPDATE authentication SET name=?, email=?, password=?, age=?, contact=?, dob=?, address=? WHERE id=?";
    db.query(sql, [name, email, password,age,contact,dob,address, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update user information" });
        } else {
            return res.status(200).json({ message: "User information updated successfully" });
        }
    });
});






const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
