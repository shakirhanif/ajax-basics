<?php
    try {
        $host = "localhost";
        $user = "root";
        $pass = "apollomoon";
        $dbname = "test_database";
        $conn = new PDO("mysql:host=$host;dbname=$dbname",$user,$pass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (\PDOException $th) {
        echo $th->getMessage();
    }
    if(isset($_POST['username'])){
        $username=$_POST['username'];
        $insert=$conn->prepare("insert into users (username) values (:username)");
        $insert->execute([':username'=>$username]);
        echo "success";
    }
    if(isset($_POST['getusers'])){
        $get=$conn->prepare("select * from users;");
        $get->execute();
        $rows=$get->fetchAll(PDO::FETCH_ASSOC);
        array_push($rows,$_POST["getusers"]);
        array_push($rows,$_POST["gold"]);
        echo json_encode($rows);
    }

?>