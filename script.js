myLibrary = [];

function Book(title, author, year, rating) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.rating = rating;
};

function addBook(title, author, year, rating) {
    myLibrary.push(new Book(title, author, year, rating));
};

addBook('Wiedźmin', 'Sapkowski', 1999, 4.5);
addBook('Wiedźmin 2', 'Sapkowski', 2001, 3);
addBook('Wiedźmin 3', 'Sapkowski', 2002, 4.5);
addBook('Wiedźmin 4', 'Sapkowski', 2003, 3);
addBook('Wiedźmin 5', 'Sapkowski', 2005, 2);
addBook('Wiedźmin 6', 'Sapkowski', 2012, 4);
addBook('Wiedźmin 7', 'Sapkowski', 2018, 5);
addBook('Wiedźmin 8', 'Sapkowski', 2025, 3);
addBook('Wiedźmin', 'Sapkowski', 1999, 4.5);
addBook('Wiedźmin 2', 'Sapkowski', 2001, 3);
addBook('Wiedźmin 3', 'Sapkowski', 2002, 4.5);
addBook('Wiedźmin 4', 'Sapkowski', 2003, 3);
addBook('Wiedźmin 5', 'Sapkowski', 2005, 2);
addBook('Wiedźmin 6', 'Sapkowski', 2012, 4);
addBook('Wiedźmin 7', 'Sapkowski', 2018, 5);
addBook('Wiedźmin 8', 'Sapkowski', 2025, 3);
addBook('Wiedźmin', 'Sapkowski', 1999, 4.5);
addBook('Wiedźmin 2', 'Sapkowski', 2001, 3);
addBook('Wiedźmin 3', 'Sapkowski', 2002, 4.5);
addBook('Wiedźmin 4', 'Sapkowski', 2003, 3);
addBook('Wiedźmin 5', 'Sapkowski', 2005, 2);
addBook('Wiedźmin 6', 'Sapkowski', 2012, 4);
addBook('Wiedźmin 7', 'Sapkowski', 2018, 5);
addBook('Wiedźmin 8', 'Sapkowski', 2025, 3);


cards = document.querySelector('.content');

for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement('div')
    card.className += "book";

    const bookInfo = document.createElement('div');
    bookInfo.className += 'book-info';

    const title = document.createElement('h3');
    title.textContent = `${myLibrary[i].title}`;
    title.className += 'title';
    bookInfo.appendChild(title);

    const yearAuthor = document.createElement('div');
    yearAuthor.className += 'year-author';
    
    const author = document.createElement('p');
    author.textContent = `${myLibrary[i].author}`;
    author.className += 'author';
    yearAuthor.appendChild(author);

    const year = document.createElement('p');
    year.textContent = `${myLibrary[i].year}`;
    year.className += 'year';
    yearAuthor.appendChild(year);

    const rating = document.createElement('p');
    ratingSpan = document.createElement('span');
    ratingSpan.textContent = `${myLibrary[i].rating}`;
    rating.appendChild(ratingSpan);
    rating.className += 'rating';
    bookInfo.appendChild(rating);

    card.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

    bookInfo.appendChild(yearAuthor);

    card.appendChild(bookInfo);

    cards.appendChild(card);
}