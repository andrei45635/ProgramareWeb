<?php

header("Access-Control-Allow-Origin: *");

$mysqli = new mysqli("localhost", "root", "", "laptops");
if ($mysqli->connect_error) {
    exit("Couldn't connect to DB");
}

$items = $_GET['items'];

$query = "SELECT * FROM laptop WHERE producator=? AND cpu=? AND memorie=? AND capacitatehdd=? AND gpu=?";
$statement = $mysqli->prepare($query);
$statement->bind_param("sssss", $items[0], $items[1], $items[2], $items[3], $items[4]);
$statement->execute();
$statement->bind_result($prod, $cpu, $mem, $caphdd, $gpu);
$json = array();

while ($statement->fetch()) {
    $json[] = array(
        'producator' => $prod,
        'cpu' => $cpu,
        'memorie' => $mem,
        'capacitatehdd' => $caphdd,
        'gpu' => $gpu
    );
}


$jsonstring = json_encode($json);
echo $jsonstring;
