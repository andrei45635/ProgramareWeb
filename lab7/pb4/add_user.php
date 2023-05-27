<?php
$conn = new mysqli("localhost", "root", "", "profiles");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];

$patternEmail = '/^[a-zA-Z][a-zA-Z0-9-_\.]{1,30}$/';
$pattern = '/^[a-zA-Z][a-zA-Z0-9-_\.]{1,30}$/';
$patternPass = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/';
preg_match($patternEmail, $username, $emailMatches, PREG_OFFSET_CAPTURE);
preg_match($pattern, $username, $usernameMatches, PREG_OFFSET_CAPTURE);
preg_match($patternPass, $password, $pwdMatches, PREG_OFFSET_CAPTURE);

if (count($usernameMatches) == 0 && count($pwdMatches) == 0 && count($emailMatches) == 0) {
    echo '<script>alert("Invalid email/username/password format!")</script>';
    //header("Location: http://localhost/lab7/pb4/index.html");
    echo file_get_contents("index.html");
} else {
    $sql = "SELECT COUNT(*) FROM users WHERE username= '" . $username . "' AND password= '" . $password . "';";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $arr = mysqli_fetch_array($result);
        if ($arr[0] == 1) {
            echo '<script>window.alert("User is already logged in!")</script>';
        } else {
            ini_set("SMTP", "ssl://smtp.gmail.com");
            ini_set("smtp_port", "465");
            $message = "Hi! You just registered for this dumb app!";
            if (mail($email, "Why would you do this?", $message)) {
                $insert = "INSERT INTO users(email, username, password) VALUES (?, ?, ?)";
                $stmt = $conn->prepare($insert);
                $stmt->bind_param("sss", $email, $username, $password);
                if ($stmt->execute()) {
                    echo "User inserted";
                } else {
                    echo "Error when inserting";
                }
                $stmt->close();
            } else {
                echo "Error sending email";
            }
            echo file_get_contents("index.html");
        }
    }
}
$conn->close();