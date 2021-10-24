<?php
// Since we are sending a JSON response here (not an HTML document), 
// set the MIME Type to application/json
header("Content-Type: application/json");
session_start();

// Because you are posting the data via fetch(), 
// php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
// This will store the data into an associative array
$json_obj = json_decode($json_str, true);

$user_id = $json_obj['user_id'];
$token = $json_obj['token'];

if(!isset($_SESSION['user_id'])){
    die(json_encode(array(
        "msg" => "Please Login First!"
    )));
}else if(!hash_equals($_SESSION['token'], $token)){
    die(json_encode(array(
        "msg" => "Wrong Token!"
    )));
}

// Retrieve tag from mysql 
require 'database.php';
$stmt = $mysqli->query("select tag from events where user_id=$user_id and tag is not null group by tag;");

$data = array();
while($row = mysqli_fetch_object($stmt)){
    array_push($data, $row);
}
$stmt->close();

echo json_encode(($data));
exit;

?>
