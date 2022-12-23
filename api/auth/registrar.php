<?php
require_once("..\cors.php");
require_once("authcontroller.php");
require_once("..\conexion.php");

header('Content-Type: application/json; charset=utf-8');

$url = $_SERVER['REQUEST_URI'];
$methodHTTP = $_SERVER['REQUEST_METHOD'];

if ($methodHTTP == 'POST') {
    $data = $_POST;
    $auth = new AuthController();
    $result = $auth->AddUsuario($data);
    echo $result;
}
?>