<?php
        session_start();
        require 'database.php';

        header("Content-Type: application/json");

        $json_str = file_get_contents('php://input');
        $json_obj = json_decode($json_str, true);
        // the server should respond with the events 
        // for only the currently-logged-in user 
        // (from the session)
        $user_id = $_SESSION['user_id'];
        $title = htmlentities($json_obj['title']);
        $event_content = htmlentities($json_obj['event_content']);
        $start_time = htmlentities($json_obj['start_time']);
        $end_time = htmlentities($json_obj['end_time']);
        $duration = htmlentities($json_obj['duration']);
        $token = htmlentities($json_obj['token']);
        $event_id = htmlentities($json_obj['event_id']);

        if(!isset($_SESSION['user_id'])){
            die("Please Login First!");
        }else if(!hash_equals($_SESSION['token'], $token)){
            die("Wrong Token!");
        }


        
        $stmt = $mysqli->prepare("update events set title = ? ,content = ?, start_time = ?, end_time =? , duration = ? where event_id = ? and user_id = ?;");
        $msg = $mysqli->error ;
        if (!$stmt){
            echo json_encode(array(
                "msg" => $msg
            ));
            exit;
        }

        $stmt->bind_param('ssssiii',$title,$event_content,$start_time,$end_time,$duration,$event_id,$user_id);
        $stmt->execute();
        $stmt->fetch();
        $stmt->close();
        echo json_encode(array(
            "msg" => "Edit Event Successfully!"
        ));
        exit;
    
?>