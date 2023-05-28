<?php

$conn = new mysqli("localhost", "root", "", "profiles");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = '';
$sql = "SELECT username FROM curr_usr;";
$res = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_array($res)) {
    $username = $row['username'];
}

if(isset($_POST['upload'])){
    $image = $_FILES['image']['name'];
    $tempname = $_FILES['image']['tmp_name'];
    $img_text = mysqli_escape_string($conn, $_POST['image_text']);
    $targetFolder = "../images/" . basename($image);
    $sql = "INSERT INTO images(image, img_text, username) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $image, $img_text, $username);
    if($stmt->execute()){
        if(move_uploaded_file($tempname, $targetFolder)){
            echo "<h3> Image uploaded successfully!</h3>";
            echo "<h3> <a href='../html/main-view.html'> Back to the main page </a></h3>";
        } else {
            echo "<h3> Error when uploading image </h3>";
        }
    } else {
        echo "<p> Error when inserting in db " . $conn->error . " </p>";
    }
    $stmt->close();
}
