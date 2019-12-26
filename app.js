// Book Constructor
let tbody = document.querySelector('tbody');
class Book {
    constructor(img, title, description, price, tick) {
        this.img = img;
        this.title = title;
        this.description = description;
        this.price = price;
        this.tick = tick;

    }
}

// UI constructor
class UI {
    addTheBook(book) {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
    		<div class="card" style="width: 18rem;">
    		  <img src="${book.img}" style="padding: 5px; height: 300px;" class="card-img-top" alt="...">
    		  <div class="card-body">
    		    <h5 class="card-title">${book.title}</h5>
    		    <p class="card-text">${book.description}</p>
                <button id='button' class="btn btn-warning">
                Kshs:<span id="amount">${book.price}</span>/=</button>
              </div>
              
    		</div>



    	`
        document.getElementById('row').appendChild(div);

    }
    countBooks(book) {
        if (book.disabled === false) {
            let totalItems = document.getElementById('countAmount');
            totalItems.textContent = parseInt(totalItems.textContent) + 1;
            book.disabled = true;
            book.parentElement.parentElement.parentElement.classList.add('disabled');
            book.className = 'btn btn-danger';
            book.style.textDecoration = 'line-through'

        }
    }
    showAlert(message, className) {
        const div = document.createElement('div');
        div.id = 'alert'
        div.innerHTML = `
            <div class="alert alert-${className} bg-warning mx-auto w-50 alert-dismissible fade show" role="alert">
            <strong>${message}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>

        
        
        `
        const container = document.querySelector('body');
        const row = document.querySelector('.top');
        container.insertBefore(div, row);
        setTimeout(function() {
            document.getElementById('alert').remove();


        }, 3000)

    }
    showModal() {
        const list = document.querySelectorAll('.disabled');
        let totalItems = 0;

        let output = '';
        let amount = 0;
        let tr = document.createElement('tr');
        list.forEach(function(item) {
            console.log(document.getElementById('price').firstChild.nextSibling)

            output += `
            <tr>
             <td>${item.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.textContent}</td>
             <td>${item.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.textContent}
             <span id='remove' class='float-right text-danger' style='cursor: pointer;'>X</span></td>  
            </tr>
           
            `






            amount += parseInt(item.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.textContent)
            totalItems = totalItems + 1;
            document.getElementById('countAmount').textContent = totalItems
            document.getElementById('price').firstChild.nextSibling.textContent = amount
                // document.getElementById('price').textContent = amount


            console.log(item);


        })
        tbody.innerHTML = output
        tbody.appendChild(tr);







        tbody.addEventListener('click', function(e) {

            if (e.target.id === 'remove') {
                const price = document.querySelectorAll('#price');



                const text = e.target.parentElement.previousSibling.previousSibling.textContent;
                list.forEach(function(book, index) {

                    if (book.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.textContent === text) {
                        // list[index].remove();

                        let dAmount = parseInt(book.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.textContent)


                        // console.log(book.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling)
                        book.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.disabled = false;
                        book.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.className = 'btn btn-warning'
                        book.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.style.textDecoration = 'none';
                        book.className = 'col';
                        amount = amount - dAmount;



                        e.target.parentElement.parentElement.remove();
                        tbody.appendChild(tr);
                        totalItems = totalItems - 1;
                        document.getElementById('countAmount').textContent = totalItems
                        document.getElementById('price').firstChild.nextSibling.textContent = amount
                            // document.getElementById('price').textContent = amount






                    }



                })

                e.preventDefault();

            }






        })







    }
}




class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];

        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books

    }
    static displayTheBooks() {
        const books = Store.getBooks();


        books.forEach(function(book) {
            const ui = new UI();
            ui.addTheBook(book);

        })
        document.getElementById('form-search').addEventListener('keyup', function() {

            const search = document.getElementById('searchInput').value;
            const cols = document.querySelectorAll('.col');

            document.querySelectorAll('.col').forEach(function(book) {
                if (book.firstElementChild.firstElementChild.nextSibling.nextSibling.firstElementChild.textContent.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    book.style.display = 'block';

                } else {
                    book.style.display = 'none';

                }

            })
        })

    }
    static addTheBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    static countBooks(book) {
        const books = Store.getBooks();







    }
}

document.addEventListener('DOMContentLoaded', Store.displayTheBooks);


// Events
// document.getElementById('form-add').addEventListener('submit', function(e) {
//     const img = document.getElementById('img').value;
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const price = document.getElementById('price').value;
//     const tick = document.getElementById('tick').value;

//     const book = new Book(img, title, description, price, tick);
//     const ui = new UI();
//     ui.addTheBook(book);
//     Store.addTheBook(book);


//     e.preventDefault();




// })


document.getElementById('row').addEventListener('click', function(e) {

    if (e.target.id === 'button' || e.target.id === 'amount') {
        const ui = new UI();
        ui.countBooks(e.target)
        Store.countBooks(e.target);
        ui.showAlert('The Book is added to your busket!', 'danger');


        e.preventDefault();


    }


})
document.querySelector('.fa-shopping-cart').addEventListener('click', function(e) {

    const ui = new UI();
    ui.showModal();

    e.preventDefault();




})


document.getElementById('purchase').addEventListener('click', function(e) {
    const ui = new UI();
    ui.showAlert('Order successiful', 'primary');




})