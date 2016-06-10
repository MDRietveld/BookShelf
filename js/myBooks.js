window.addEventListener('load', init);

var booksToRead;
//function on load, make var for 2 divs where we will put in content
function init(){
  getBooks();
  booksToRead = document.getElementById('books-to-read');
  booksAlreadyRead = document.getElementById('books-already-read');
}

function getBooks(){
  myAjaxRequest(showMyBooks);
}
//get the information from my books.php file
function myAjaxRequest(ajaxSuccesHandler, data){
  var parameters = {
    dataType: 'json',
    url: 'php/books.php'
  };

  $.ajax(parameters).done(ajaxSuccesHandler);
}

function showMyBooks(data){
  console.log(data);
  var books = data;
  //for each row of data make a div with content inside
  for (var i = 0; i < books.length; i++){
    var div = createDomElement({tagName: 'div', attributes: {class:'my-book'}});
    var info = createDomElement({tagName: 'div', attributes: {class:'my-info'}});
    var hidden = createDomElement({tagName: 'input', attributes: {class:'my-id', type:'hidden', value:books[i].books_id}, content: books[i].books_id});
    var title = createDomElement({tagName: 'h3', attributes: {class:'my-title'}, content: books[i].books_title});
    var author = createDomElement({tagName: 'p', attributes: {class:'my-paragraph'}, content: books[i].books_author});
    var date = createDomElement({tagName: 'p', attributes: {class:'date'}, content: books[i].book_added});
    var image = createDomElement({tagName: 'img', attributes: {class: 'flickr', src:books[i].url}});
    if(books[i].books_status == 0){
      var button = createDomElement({tagName: 'input', attributes: {class:'my-add', name:'readBook', type:'submit', value:'READ!'}})
    }


    //append the content to eachother
    div.appendChild(image);
    info.appendChild(title);
    info.appendChild(hidden);
    info.appendChild(author);
    info.appendChild(date);


    //if we have not read it yet, add a button
    div.appendChild(info);
    if(books[i].books_status == 0){
      button.addEventListener("click", ajaxChange);
      div.appendChild(button);
    }
    if(books[i].books_status == 0){
      booksToRead.appendChild(div);
    }else{
      booksAlreadyRead.appendChild(div);

    }
  }
}
