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

if (count($usernameMatches) == 0 || count($pwdMatches) == 0 || count($emailMatches) == 0) {
    echo '<script>alert("Invalid email/username/password format!")</script>';
    header("Location: http://localhost/lab7/pb4/index.html");
} else {
    $sql = "SELECT COUNT(*) FROM users WHERE username= '" . $username . "' AND password= '" . $password . "';";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $arr = mysqli_fetch_array($result);
        if ($arr[0] == 1) {
            echo '<script>alert("User is already logged in!")</script>';
        } else {
            $to = "iacob.andrei34@gmail.com";
            $subject = "This is subject";
            $message = "<h1>This is headline.</h1>";
            $header = "Content-type: text/html\r\n";

            ini_set('SMTP','smtp.gmail.com');
            ini_set('smtp_port',25);
            ini_set('sendmail_from', "iacob.andrei34@gmail.com");
            $retval = mail($to, $subject, $message, $header);

            if ($retval) {
                echo "Message sent successfully...";
            } else {
                echo "Message could not be sent...";
            }
        }
    }
}
$conn->close();