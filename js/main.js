//add onclick to search book button
document.getElementById("search-book").addEventListener("click", getBooks);

//empty the div so we do not stack requests
function getBooks(){
  document.getElementById('book-search').innerHTML = "";
  ajaxRequest(showBooks);
}

//get information from google api on input of our input field
function ajaxRequest(ajaxSuccesHandler, data){
  var input = document.getElementById('bookinput').value;

  var parameters= {
      dataType: 'json',
      url: 'https://www.googleapis.com/books/v1/volumes',
      data: { q: input }
  };
  $.ajax(parameters).done(ajaxSuccesHandler);

}


function showBooks(data){
  console.log(data);
  var books = data.items;

  //Make a div within information to show for each gathered item
  for (var i = 0; i <books.length; i++){
    var div = createDomElement({tagName: 'div', attributes: {class:'book'}});
    var info = createDomElement({tagName: 'div', attributes: {class:'info'}});
    var title = createDomElement({tagName: 'h3', attributes: {class:'title'}, content: books[i].volumeInfo.title});
    var author = createDomElement({tagName: 'p', attributes: {class:'paragraph'}, content: books[i].volumeInfo.authors[0]});
    var button = createDomElement({tagName: 'input', attributes: {class:'add', name:'addBook', type:'submit', value:'add'}});

    info.appendChild(title);
    info.appendChild(author);


    div.appendChild(info);
    //Add an event listener to the click button
    button.addEventListener("click", ajaxPost);

    div.appendChild(button);
    bookSearch = document.getElementById('book-search');
    bookSearch.appendChild(div);
  }
}

//Function to create the elements easier
function createDomElement(properties){
    //Creating the element with the property tagName
    var domElement = document.createElement(properties.tagName);

    //Loop through the attributes to set them on the element
    var attributes = properties.attributes;
    for (var prop in attributes) {
        domElement.setAttribute(prop, attributes[prop]);
    }

    //If any content, set the inner HTML
    if (properties.content) {
        domElement.innerHTML = properties.content;
    }

    //Return to use in other functions
    return domElement;
}
