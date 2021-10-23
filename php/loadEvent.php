<?php
// Since we are sending a JSON response here (not an HTML document), 
// set the MIME Type to application/json
header("Content-Type: application/json");

// Because you are posting the data via fetch(), 
// php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
// This will store the data into an associative array
$json_obj = json_decode($json_str, true);

$user_id = $json_obj['user_id'];

// Retrieve data from mysql 
require 'database.php';
$stmt = $mysqli->query("select * from events where user_id=$user_id");

$data = array();
while($row = mysqli_fetch_object($stmt)){
    array_push($data, $row);
}
$stmt->close();

echo json_encode(($data));
exit;

?>
