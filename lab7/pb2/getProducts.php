<?php
$conn = new mysqli("localhost", "root", "", "laptops");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//security issue: users could input any kind of characters
//checking to see if the input is an integer, otherwise redirect to the main page
$pageLimit = $_GET["laptop"];
$pattern = '/[0-9]{1,30}$/';
preg_match($pattern, $pageLimit, $matches, PREG_OFFSET_CAPTURE);
if (count($matches) == 0) {
    header("Location: http://localhost/lab7/pb2/index.html");
}

$pageNr = $_GET["nrPag"];

$totalProducts = 0;

$query = "SELECT COUNT(*) AS total FROM laptop;";
$statement = $conn->prepare($query);
$statement->execute();
$statement->bind_result($totalProducts);
$statement->fetch();

if($pageLimit > $totalProducts){
    echo "<script>window.alert('Please input a different, lower number') </script>";
    header("Location: http://localhost/lab7/pb2/index.html");
}

$productsOnPage = ceil($totalProducts / $pageLimit);

$statement->close();

$sql = "SELECT * FROM laptop LIMIT " . ($pageLimit * $pageNr) . ", " . $pageLimit . ";";
$result = mysqli_query($conn, $sql);
echo "<form action='http://localhost/lab7/pb2/getProducts.php' method='GET'>"; // Add form start tag
//updating the values for the pageNr
echo "<input type='text' hidden name='nrPag' value=" . ($pageNr - 1 ). ">";
echo "<input type='text' hidden name='laptop' value=" . $pageLimit. ">";
echo "<table> <tr> <th> Producator </th> <th> CPU </th> <th> Memorie </th> <th> Capacitate HDD </th> <th> GPU </th></tr>";
if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr><td>" . $row["producator"] . "</td><td>" . $row["cpu"] . "</td>";
        echo "<td>" . $row["memorie"] . "</td><td>" . $row["capacitatehdd"] . "</td> <td>" . $row["gpu"] . "</td></tr>";
    }
} else {
    echo "No rows found.";
}
echo "</form></table>";
echo "<hr>";

echo "<table> <tr> <td>";
$prev = false;
$next = false;
if ($pageNr - 1 > -1) {
    $prev = true;
}

if (!$prev) {
    echo "<input type='submit' value='Prev' hidden>";
} else {
    echo "<input type='submit' value='Prev'>";
}
echo "</td><td>";
$sql1 = "SELECT * FROM laptop LIMIT " . ($pageLimit * ($pageNr + 1)) . ", " . $pageLimit . ";";
$result1 = mysqli_query($conn, $sql1);
while ($row = mysqli_fetch_assoc($result1)) {
    $next = true;
    break;
}

echo "<form action='http://localhost/lab7/pb2/getProducts.php' method='GET'>";
//updating the values for the pageNr
echo "<input type='text' hidden name='nrPag' value=" . ($pageNr + 1 ). ">";
echo "<input type='text' hidden name='laptop' value=" . $pageLimit. ">";
if (!$next) {
    echo "<input type='submit' value='Next' hidden>";
} else {
    echo "<input type='submit' value='Next'>";
}
echo "</form></td></tr></table>";
$conn->close();