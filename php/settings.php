<?php
//connect to database
$host = '127.0.0.1';
$user = 'root';
$password = '';
$database = 'book_shelf';

$conn = mysqli_connect($host, $user, $password, $database);

if(!$conn){
	die('Could not connect ' . mysql_error());
}


?>
