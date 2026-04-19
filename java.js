const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "food_delivery"
});

// Get Menu
app.get("/menu", (req, res) => {
    db.query("SELECT * FROM menu_items", (err, result) => {
        res.json(result);
    });
});

// Place Order
app.post("/order", (req, res) => {
    const { user_id, total_price } = req.body;

    db.query(
        "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'Pending')",
        [user_id, total_price],
        (err, result) => {
            res.json({ message: "Order placed" });
        }
    );
});

app.listen(8080, () => console.log("Server running on port 8080"));
