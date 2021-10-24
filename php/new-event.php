<?php
require 'database.php';
session_start();

header("Content-Type: application/json");

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

// $user_id = (int)htmlentities($json_obj['user_id']);
$user_id = $_SESSION['user_id'];
$title = htmlentities($json_obj['title']);
$event_content = htmlentities($json_obj['event_content']);
$start_time = htmlentities($json_obj['start_time']);
$end_time = htmlentities($json_obj['end_time']);
$duration = htmlentities($json_obj['duration']);
$tag = htmlentities($json_obj['event_tag']);
$token = htmlentities($json_obj['token']);

if(!isset($_SESSION['username'])){
    die("Please Login First!");
}else if(!hash_equals($_SESSION['token'], $token)){
    die("Wrong Token!");
}


if(!empty($title) && !empty($start_time) && !empty($end_time)){
    $stmt = $mysqli->prepare("insert into events 
    (user_id,title,content,start_time,end_time,duration,tag) 
    values (?,?,?,?,?,?,?)");

    if (!$stmt){
        echo json_encode(array(
            "msg" => "mysql error"
        ));
        exit;
    }

    $stmt->bind_param('issssss',$user_id,$title,$event_content,$start_time,$end_time,$duration,$tag);
    $stmt->execute();
    $stmt->close();
    echo json_encode(array(
        "msg" => "New Event Created Successfully!"
    ));
    exit;
}else{
    echo json_encode(array(
        "msg" => "Please Fill Required Field."
    ));
    exit;
    
}



?>