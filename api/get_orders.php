<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

// Simple password verification to protect customer data
$password = isset($_GET['password']) ? $_GET['password'] : '';
if ($password !== 'genius_admin_2026') {
    echo json_encode(["success" => false, "error" => "Unauthorized access. Invalid security credentials."]);
    exit;
}

$conn = get_db_connection();

$sql = "SELECT * FROM orders ORDER BY order_date DESC";
$result = $conn->query($sql);

$orders = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode(["success" => true, "orders" => $orders]);

$conn->close();
?>
