<?php

header("Access-Control-Allow-Origin: *");

$mysqli = new mysqli("localhost", "root", "", "studentsfr");
if ($mysqli->connect_error) {
    exit("Couldn't connect to DB");
}

$query = "UPDATE Profile SET firstname=?, lastname=?, phone=?, email=? WHERE studentid=?";
$statement = $mysqli->prepare($query);
$statement->bind_param("ssssd", $_GET['fname'], $_GET['lname'], $_GET['pnum'], $_GET['email'], $_GET['id']);
$statement->execute();
