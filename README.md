# wepp
CREATE DATABASE food_delivery;
USE food_delivery;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100));
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2));
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(10,2),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

<!DOCTYPE html>
<html>
<head>
    <title>Food Delivery</title>
</head>
<body>

<h1>🍔 Food Menu</h1>

<div id="menu"></div>

<script>
async function loadMenu() {
    const res = await fetch("http://localhost:8080/menu");
    const data = await res.json();

    let html = "";
    data.forEach(item => {
        html += `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>₹${item.price}</p>
                <button onclick="order(${item.id}, ${item.price})">Order</button>
            </div>
        `;
    });

    document.getElementById("menu").innerHTML = html;
}

async function order(id, price) {
    await fetch("http://localhost:8080/order", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user_id: 1,
            total_price: price
        })
    });

    alert("Order placed!");
}

loadMenu();
</script>

</body>
</html>
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
