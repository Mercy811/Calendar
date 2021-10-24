<?php

        header("Content-Type: application/json");
        $json_str = file_get_contents('php://input');
        $json_obj = json_decode($json_str, true);

        $event_id = htmlentities($json_obj['event_id']);
        $user_id = htmlentities($json_obj['user_id']); 

        require 'database.php';

        $stmt = $mysqli->prepare("delete from events where user_id = ? and event_id = ?;");

        if (!$stmt) {
            $msg = "Query Prep Failed: %{$mysqli->error}\n";
            echo json_encode(array(
                "msg" => $mysqli->error
            ));
            exit;
        }

        $stmt->bind_param('ss', $user_id, $event_id);
        $stmt->execute();
        $stmt->fetch();
        $stmt->close();

        echo json_encode(array(
            "success" => true,
            "msg" => "delete successfully!"
        ));
        exit;

?>