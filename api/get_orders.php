<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

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

if (!$result) {
    echo json_encode(["success" => false, "error" => "Database Query Error: " . $conn->error]);
    $conn->close();
    exit;
}

$orders = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

echo json_encode(["success" => true, "orders" => $orders]);

$conn->close();
?>
