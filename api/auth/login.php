<?php
require_once('../cors.php');
require_once('authController.php');
require_once('../conexion.php');

$methodHTTP = $_SERVER['REQUEST_METHOD'];

if ($methodHTTP == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $auth = new AuthController();
    $result = $auth->autenticateClave($data);
    echo json_encode($result);
}

?>