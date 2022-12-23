<?php
class AuthController
{
    public function autenticate($data)
    {
        try {
            $email = $data['email'];
            $conexion = new Conexion();
            $db = $conexion->getConexion();
            $query = 'SELECT * FROM users WHERE email=:email';
            $statement = $db->prepare($query);
            $statement->bindParam(':email', $email);
            $statement->execute();
            $resultData = $statement->fetch();
            if ($resultData == null) {
                return ["status" => "400", "data" => $resultData, "login" => false];
            } else {
                return [
                    "status" => "200",
                    "data" => ["id" => $resultData["id"]],
                    "login" => true
                ];
            }
        } catch (PDOException $e) {
            echo "!Error!: " . $e->getMessage() . "<br/>";
        }
    }
    public function autenticateClave($data)
    {
        try {
            $email = $data['email'];
            $password = $data['password'];
            $conexion = new Conexion();
            $db = $conexion->getConexion();
            $query = 'SELECT * FROM users WHERE email=:email and password=:password';
            $statement = $db->prepare($query);
            $statement->bindParam(':email', $email);
            $statement->bindParam(':password', $password);
            $statement->execute();
            $resultData = $statement->fetch();
            if ($resultData == null) {
                return ["status" => "400", "data" => $resultData, "login" => false];
            } else {
                return [
                    "status" => "200",
                    "data" => ["id" => $resultData["id"]],
                    "login" => true
                ];
            }
        } catch (PDOException $e) {
            echo "!Error!: " . $e->getMessage() . "<br/>";
        }
    }
    public function AddUsuario($data)
    {
        $email = $data['email'];
        $password = $data['password'];
        $conexion = new Conexion();
        $db = $conexion->getConexion();
        $sql = 'INSERT INTO users (email,password) values (:email,:password)';
        $query = $db->prepare($sql);
        $query->bindParam(':email', $email);
        $query->bindParam(':password', $password);
        $query->execute();
        return '{"msg":"Usuario Creado"}';
    }
}
?>