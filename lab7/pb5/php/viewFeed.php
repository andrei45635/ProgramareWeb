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

$feedImgs = "SELECT * FROM images WHERE username NOT LIKE '" . $username . "';";
$res_imgs = mysqli_query($conn, $feedImgs);
if(mysqli_num_rows($res_imgs) > 0){
    while($row = mysqli_fetch_array($res_imgs)){
        echo "<p> User: " . $row['username'] . " </p>";
        echo "<img src='../images/". $row['image']. "' alt='ll'>";
        echo "<p>" . $row['img_text'] . "</p>";
    }
} else {
    echo "<p> You're all caught up! </p>";
}
echo "<p> You're all caught up! </p>";
echo "<a href='../html/main-view.html'> Back to the main page </a>";