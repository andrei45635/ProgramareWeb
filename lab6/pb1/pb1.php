<?php

header("Access-Control-Allow-Origin: *");

$mysqli = new mysqli("localhost", "root", "", "rute");
if ($mysqli->connect_error) {
    exit("Couldn't connect to DB");
}

$query = "SELECT Sosire FROM trenuri WHERE Plecare=?;";
$statement = $mysqli->prepare($query);
$statement->bind_param('s', $_GET['plecare']);
$statement->execute();
$statement->bind_result($result);

echo "<table>";

while ($statement->fetch()) {
    echo "<tr><td>$result</td></tr>";
}
echo "</table>";
