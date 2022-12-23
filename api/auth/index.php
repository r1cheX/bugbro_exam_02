<?php
require_once("..\cors.php");
require_once("authcontroller.php");
require_once("..\conexion.php");

header('Content-Type: application/json; charset=utf-8');

$url = $_SERVER['REQUEST_URI'];
$methodHTTP = $_SERVER['REQUEST_METHOD'];

if ($methodHTTP == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $auth = new AuthController();
    $result = $auth->autenticate($data);
    echo json_encode($result);
}
?>
