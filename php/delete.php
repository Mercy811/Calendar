<?php

        header("Content-Type: application/json");
        session_start();
        $json_str = file_get_contents('php://input');
        $json_obj = json_decode($json_str, true);

        $event_id = htmlentities($json_obj['event_id']);
        $user_id = $_SESSION['user_id'];
        // the server should respond with the events for only the currently-logged-in user (from the session)
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