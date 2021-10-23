<?php

    header("Content-Type: application/json");
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $user_input = htmlentities($json_obj['username']);
    $pwd_input = htmlentities($json_obj['password']);
    $re_input = htmlentities($json_obj['repassword']);

    if ($json_obj['username'] == "") {
        echo json_encode(array("msg" => "Please enter an username."));
        exit;
    }

    if($pwd_input != $re_input) {
        echo json_encode(array("msg" => "Passwords do not match!"));
        exit;
    }

    require 'database.php';

    $stmt = $mysqli->prepare("insert into users (username, password) values (?, ?);");
   
    if (!$stmt) {
        $msg = "Query Prep Failed: %{$mysqli->error}\n";
        echo json_encode(array(
            "msg" => $mysqli->error
        ));
        exit;
    }

    $hash = password_hash($pwd_input, PASSWORD_BCRYPT);

    $stmt->bind_param('ss', $user_input, $hash);
    $stmt->execute();
    $stmt->fetch();
    $stmt->close();

    echo json_encode(array(
        "success" => true,
        "msg" => "Sign up successfully!"
    ));
    exit;


?>