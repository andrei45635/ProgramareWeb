<?php
$conn = new mysqli("localhost", "root", "", "profiles");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = '';
$sql = "SELECT username FROM curr_usr";
$res = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_array($res)) {
    $username = $row['username'];
}

$imgs = "SELECT * FROM images WHERE username= '" . $username . "'";
$res_imgs = mysqli_query($conn, $imgs);
if(mysqli_num_rows($res_imgs) > 0){
    while($row = mysqli_fetch_array($res_imgs)){
        echo "<img src='../images/". $row['image']. "' alt='ll'>";
        echo "<p>" . $row['img_text'] . "</p>";
        echo "<form action='../php/deletePhoto.php' method='POST'>";
        echo "<input type = 'hidden' name = 'id' value = '" . $row['id'] . "'>";
        echo "<button type = 'submit'> Delete </button>";
        echo "</form>";
    }
} else {
    echo "<p> Seems like you haven't shared anything yet... </p>";
    echo "<p> Why not start now? <a href='../html/add-photo.html'> Add a photo! </a></p>";
}
