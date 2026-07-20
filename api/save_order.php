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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        echo json_encode(["success" => false, "error" => "Invalid order data received"]);
        exit;
    }
    
    $conn = get_db_connection();
    
    // Prepare sanitized values
    $name = $conn->real_escape_string($data['name']);
    $phone = $conn->real_escape_string($data['phone']);
    $email = $conn->real_escape_string($data['email']);
    $address = $conn->real_escape_string($data['address']);
    $city = $conn->real_escape_string($data['city']);
    $state = $conn->real_escape_string($data['state']);
    $zip = $conn->real_escape_string($data['zip']);
    $items = $conn->real_escape_string($data['items']);
    $subtotal = floatval($data['subtotal']);
    $gst = floatval($data['gst']);
    $grand_total = floatval($data['grand_total']);
    $payment_status = $conn->real_escape_string($data['payment_status']);
    $payment_id = isset($data['payment_id']) && !empty($data['payment_id']) ? "'" . $conn->real_escape_string($data['payment_id']) . "'" : "NULL";
    
    $sql = "INSERT INTO orders (customer_name, customer_phone, customer_email, address, city, state, zip, items, subtotal, gst, grand_total, payment_status, razorpay_payment_id) 
            VALUES ('$name', '$phone', '$email', '$address', '$city', '$state', '$zip', '$items', $subtotal, $gst, $grand_total, '$payment_status', $payment_id)";
            
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "order_id" => $conn->insert_id]);
    } else {
        echo json_encode(["success" => false, "error" => "Error saving order: " . $conn->error]);
    }
    
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
