<?php
class Conexion
{
    public function getConexion()
    {
        try {
            $host = "localhost";
            $db = "bdionic";
            $user = "root";
            $password = "";
            $db = new PDO("mysql:host=$host;dbname=$db;", $user, $password);
            return $db;
        } catch (PDOException $e) {
            echo "!Error BD!" . $e->getMessage() . "<br/>";
            die();
        }
    }
}
?>