myLibrary = [];

function Book(title, author, year, rating, status) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.rating = rating;
  this.status = status;
  this.colour = Math.random() * 360;
}

Book.prototype.toggleStatus = function () {
  if (this.status === "false") {
    this.status = "true";
  } else {
    this.status = "false";
  }
};

function addBook(title, author, year, rating, status) {
  myLibrary.push(new Book(title, author, year, rating, status));
}

cards = document.querySelector(".content");

const addButton = document.querySelector("#add-btn");
const addDialog = document.querySelector(".add-book");
const closeBtn = document.querySelector(".close");
const confirmBtn = document.querySelector("#confirm");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const ratingInput = document.getElementById("rating");
const statusInput = document.getElementById("read");

addButton.addEventListener("click", () => {
  addDialog.style.transform = "scaleY(1)";
  addDialog.show();
});

closeBtn.addEventListener("click", () => {
  addDialog.style.transform = "scaleY(0)";
  addDialog.close();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (titleInput.value == "") {
    alert("please input the title (placeholder)");
    return;
  }

  const titleInputValue = titleInput.value;
  const authorInputValue = authorInput.value;
  const yearInputValue = yearInput.value;
  const ratingInputValue = ratingInput.value;
  const statusInputValue = statusInput.value;

  addBook(
    titleInputValue,
    authorInputValue,
    yearInputValue,
    ratingInputValue,
    statusInputValue
  );
  updateLibrary();

  titleInput.value = null;
  authorInput.value = null;
  yearInput.value = null;
  ratingInput.value = null;
});

function updateLibrary() {
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;

    const card = document.createElement("div");
    card.className += "book big";
    card.setAttribute("data-index", `${i}`);

    const bookInfo = document.createElement("div");
    bookInfo.className += "book-info";

    const title = document.createElement("h3");
    title.textContent = `${myLibrary[i].title}`;
    title.className += "title";
    bookInfo.appendChild(title);

    const yearAuthor = document.createElement("div");
    yearAuthor.className += "year-author";

    const author = document.createElement("p");
    author.textContent = `${myLibrary[i].author}`;
    author.className += "author";
    yearAuthor.appendChild(author);

    const year = document.createElement("p");
    year.textContent = `${myLibrary[i].year}`;
    year.className += "year";
    yearAuthor.appendChild(year);

    const rating = document.createElement("p");
    ratingSpan = document.createElement("span");
    ratingSpan.textContent = `${myLibrary[i].rating}`;
    rating.appendChild(ratingSpan);
    rating.className += "rating";
    bookInfo.appendChild(rating);

    card.style.filter = `hue-rotate(${myLibrary[i].colour}deg) saturate(40%)`;

    bookInfo.appendChild(yearAuthor);

    card.appendChild(bookInfo);

    cards.prepend(card);
  }
}

cards.addEventListener("click", (event) => {
  let target = event.target;

  if (target.className == "content") {
    return;
  }

  const selected = cards.querySelector(".selected");

  if (selected) {
    selected.classList.remove("selected");
  }

  while (target.className != "book big") {
    target = target.parentElement;
  }

  target.classList.add("selected");

  targetIndex = target.getAttribute("data-index");

  displayBookOptions(targetIndex);
});

const displayTitle = document.querySelector(".display-title");
const displayAuthor = document.querySelector(".display-author");
const displayYear = document.querySelector(".display-year");
const displayRating = document.getElementById("display-rating-id");

const readDisplay = document.querySelector(".true");

function displayBookOptions(index) {
  displayTitle.textContent = `${myLibrary[index].title}`;
  displayAuthor.textContent = `${myLibrary[index].author}`;
  displayYear.textContent = `${myLibrary[index].year}`;
  displayRating.textContent = `${myLibrary[index].rating}`;

  if (myLibrary[index].status === "true") {
    readDisplay.style.transform = "scaleX(1)";
  } else {
    readDisplay.style.transform = "scaleX(0)";
  }
}

const removeButton = document.querySelector(".remove-btn");

removeButton.addEventListener("click", () => {
  index = cards.querySelector(".selected").getAttribute("data-index");

  myLibrary.splice(index, 1);
  updateLibrary();

  displayBookOptions(index < myLibrary.length - 1 ? index : index - 1);
});

const statusToggle = document.querySelector("#status-toggle-btn");

statusToggle.addEventListener("click", () => {
  const index = cards.querySelector(".selected").getAttribute("data-index");
  myLibrary[index].toggleStatus();
  displayBookOptions(index);
});

addBook("The Midnight Library", "Matt Haig", "2020", "4", "false");
addBook("Dune", "Frank Herbert", "1965", "5", "true");
addBook("The Silent Patient", "Alex Michaelides", "2019", "4.5", "true");
addBook("Educated", "Tara Westover", "2018", "5", "false");

displayBookOptions(0);

updateLibrary();
cards.lastChild.classList.add("selected");

function formatTime(time) {
  const minutes = Math.floor(time / 60);

  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const timeDisplay = document.querySelector(".timer-time-display");

let timeLimit = 0;

let timePassed = 0;
let timeLeft = timeLimit;

let timerInterval = null;

function startTimer() {
  if (timerInterval !== null) {
    return;
  }
  timerInterval = setInterval(() => {
    if (timeLimit > timePassed) {
      timePassed += 1;
      timeLeft = timeLimit - timePassed;

      document.querySelector("#timer-time-display").textContent = `${formatTime(
        timeLeft
      )}`;

      setCircleDasharray();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }, 1000);
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(0)} 283`;
  document
    .querySelector(".base-timer__path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

const startTimerBtn = document.querySelector(".start-timer");
const minutesInput = document.querySelector("#timer-minutes-set");
const secondsInput = document.querySelector("#timer-seconds-set");

startTimerBtn.addEventListener("click", () => {
  timeLimit = Number(minutesInput.value * 60) + Number(secondsInput.value);

  console.log(timeLimit);

  startTimer();
});
