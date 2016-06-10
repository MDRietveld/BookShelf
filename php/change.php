<?php

include 'settings.php';

//get id and use that to update the database
$id = $_POST['id'];
$query = mysqli_query($conn, "UPDATE Book_shelf SET
  books_status = 1
  WHERE books_id =".$id);

mysqli_close($conn);

?>
