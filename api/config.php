<?php
// ==========================================
// GENIUS GEMS & JEWELLERY - DATABASE CONFIG
// ==========================================

define('DB_HOST', 'localhost'); // Default for Hostinger
define('DB_NAME', 'u123456789_genius_gems'); // Replace with Hostinger Database Name
define('DB_USER', 'u123456789_genius_user'); // Replace with Hostinger Database User
define('DB_PASS', 'AdminPassword_2026'); // Replace with Hostinger Database Password

// Establish database connection
function get_db_connection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        header('Content-Type: application/json');
        die(json_encode(["success" => false, "error" => "Database connection failed: " . $conn->connect_error]));
    }
    $conn->set_charset("utf8");
    return $conn;
}
?>
