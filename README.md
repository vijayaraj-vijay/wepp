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
