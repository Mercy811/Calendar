<?php
// Since we are sending a JSON response here (not an HTML document), 
// set the MIME Type to application/json
header("Content-Type: application/json");

// Because you are posting the data via fetch(), 
// php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
// This will store the data into an associative array
$json_obj = json_decode($json_str, true);

// Access variable passed from js
// Equiavlent to $_POST[]
$user_id = $json_obj['user_id'];


// Retrieve data from mysql 
require 'database.php';
$stmt = $mysqli->prepare("select title,content,start_time,end_time,duration from events where user_id=?");

if (!$stmt) {
    $msg = "Query Prep Failed: %{$mysqli->error}\n";
    echo json_encode(array(
        "msg" => $msg
    ));
    exit;
}

$stmt->bind_param('i', $user_id);
$stmt->execute();

$stmt->bind_result($title,$content,$start_time,$end_time,$duration);
while($stmt->fetch()){
    
}
$stmt->close();

echo json_encode(array(
    "events"=>$reponse_data
));
exit;

?>
