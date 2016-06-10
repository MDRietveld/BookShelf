function ajaxPost(){
  //When "add" button is pressed send title and author to post.php
  var info = $(this).parent('.book').children('.info')
  var title = info.find('.title').text();
  var author = info.find('.paragraph').text();
  var parameters = {
    type: "POST",
    url: "php/post.php",
    data:{
      title,
      author
    }
  }
  //if it is all good send data else give me the error
  $.ajax(parameters).done(function(data){
    console.log(data);
  }).error(function(error){
    console.log(error);
  });
}


function ajaxChange(){
  //When "Read" button is pressed send id to change.php
  var id = $(this).parent('.my-book').children('.my-info').find('.my-id').val();
  console.log(id);
  var parameters = {
    type: "POST",
    url: "php/change.php",
    data: {id}
  }
  $.ajax(parameters).done(function(data){
    console.log(data);
  }).error(function(error){
    console.log(error);
  });
}
