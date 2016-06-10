<?php

include 'settings.php';
//set json
header('Content-type: application/json');
//set api key
$api_key = '101481fed7852c00745e0c497d0e471f';
//make query
$sql = "SELECT * FROM Book_shelf";

$result = $conn->query($sql);


$books= array();
//for each gathered row fetch a picture and the information of the row
while($row = mysqli_fetch_assoc($result)){
  $tag = $row['books_title'];
  $perPage = 1;
  $url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
  $url.= '&api_key='.$api_key;
  $url.= '&tags='.$tag;
  $url.= '&per_page='.$perPage;
  $url.= '&format=json';
  $url.= '&nojsoncallback=1';
  $response = json_decode(file_get_contents($url));
  if ($response){
    $photo_array = $response->photos->photo;

    $farm_id = $photo_array[0]->farm;
    $server_id = $photo_array[0]->server;
    $photo_id = $photo_array[0]->id;
    $secret_id = $photo_array[0]->secret;
    $size = 'm';
    $title = $photo_array[0]->title;
    $photo_url = 'https://farm'.$farm_id.'.staticflickr.com/'.$server_id.'/'.$photo_id.'_'.$secret_id.'_'.$size.'.'.'jpg';

    $row['url'] = $photo_url;
  }else{
    $row['url'] = 'https://farm2.staticflickr.com/1538/25816015964_349b5a01bd_m.jpg';
  }



  $books[] = $row;
}
//echo the books array so I can call ajax to gather it
echo json_encode($books);
mysqli_close($conn);

?>
