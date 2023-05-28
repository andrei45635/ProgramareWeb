<?php
$conn = new mysqli("localhost", "root", "", "profiles");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$id = $_POST['id'];
$sql = "DELETE FROM images WHERE id= " . $id;
if($conn->query($sql)){
    header("Location: http://localhost/lab7/pb5/php/viewMyPhotos.php");
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}