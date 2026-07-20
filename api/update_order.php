<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

require_once 'config.php';

// Parse POST inputs
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "Invalid action parameters received"]);
    exit;
}

$password = isset($data['password']) ? $data['password'] : '';
if ($password !== 'genius_admin_2026') {
    echo json_encode(["success" => false, "error" => "Unauthorized access."]);
    exit;
}

$conn = get_db_connection();
$order_id = intval($data['order_id']);
$action = $conn->real_escape_string($data['action']);

if ($action === 'update_status') {
    $status = $conn->real_escape_string($data['status']);
    $sql = "UPDATE orders SET payment_status = '$status' WHERE id = $order_id";
} elseif ($action === 'delete') {
    $sql = "DELETE FROM orders WHERE id = $order_id";
} else {
    echo json_encode(["success" => false, "error" => "Invalid action specified."]);
    $conn->close();
    exit;
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Database error: " . $conn->error]);
}

$conn->close();
?>
