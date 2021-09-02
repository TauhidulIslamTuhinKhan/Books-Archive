
const errorDiv = document.getElementById('error-message');
const bookNumber = document.getElementById('book-number');
const searchField = document.getElementById('search-field');
const searchResult = document.getElementById('search-result');
const spinner = document.getElementById('spinner');

// const toggleSearchResult = searchResult => {
//     searchResult.style.display = searchResult;
// }

// search button
const searchItem = () => {
    //clear text
    bookNumber.innerHTML = ''; 
    searchResult.textContent = '';
    const searchText = searchField.value;
    if(searchText === ''){
        errorDiv.innerText = 'Search field cannot be empty'; //error message
        return;       
    };
    //clear text
    errorDiv.innerText = '';
    searchField.value = '';
    spinner.classList.remove('d-none'); // spinner add
    searchResult.classList.add('d-block'); // content add
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.numFound === 0) {
            errorDiv.innerText = 'No Result Found'; //error message
            spinner.classList.add('d-none'); // spinner remove
            searchResult.classList.remove('d-block'); // content remove
        }
        else{
            errorDiv.innerText = '';
            displaySearchItem(data.docs)            
        }
    }); 
};


// display search item
const displaySearchItem = (items) => {   
    console.log(items);  
      // show number of books after scearch  
    bookNumber.innerHTML = `
    <p>${items.length} book found</P>
    `;      
    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `        
        <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">Book Name : ${item.title}</p>
                        <p class="card-text">Author : ${item.author_name}</p>
                        <p class="card-text">Publisher : ${item.publisher}</p>
                        <p class="card-text">Publish : ${item.first_publish_year}</p>
                    </div>
        `;
        searchResult.appendChild(div);
    });
    spinner.classList.add('d-none'); // spinner remove
    searchResult.classList.remove('d-block'); // content remove

};