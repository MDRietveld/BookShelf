<?php

include 'settings.php';
//set timezone and gather posted data
date_default_timezone_set('Europe/Amsterdam');
$title = $_POST['title'];
$author = $_POST['author'];
$date = new DateTime();
//send data to database
$query = mysqli_query($conn, "INSERT INTO Book_shelf (books_title, books_author, book_added, books_status) VALUES (
  '".$title."',
  '".$author."',
  now(),
  0)");

//close database
mysqli_close($conn);

?>
