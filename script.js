// Funzione per mostrare i libri
function displayBooks(books) {
  const container = document.getElementById("product-container");

  // Svuota il contenuto precedente del container
  container.innerHTML = "";

  books.forEach((book) => {
    // Crea una colonna Bootstrap per ciascun libro
    const col = document.createElement("div");
    col.classList.add("col-12", "col-md-6", "col-lg-3");

    // Crea una card Bootstrap per ciascun libro
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = book.title;

    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = book.img;
    image.alt = book.title;

    const price = document.createElement("p");
    price.classList.add("card-text");
    price.textContent = "Prezzo: $" + book.price.toFixed(2);

    const category = document.createElement("p");
    category.classList.add("card-text");
    category.textContent = "Categoria: " + book.category;

    // Crea un pulsante per aggiungere al carrello
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("btn", "btn-success");
    addToCartButton.textContent = "Aggiungi al carrello";

    // Aggiunge l'evento click al pulsante "Aggiungi al carrello"
    addToCartButton.addEventListener("click", handleAddToCartButtonClick);

    // Crea un pulsante per salvare tra i preferiti
    const saveButton = document.createElement("button");
    saveButton.classList.add("btn", "btn-primary");
    saveButton.textContent = "Salva";

    // Aggiunge l'evento click al pulsante "Salva"
    saveButton.addEventListener("click", handleSaveButtonClick);

    cardBody.appendChild(title);
    cardBody.appendChild(image);
    cardBody.appendChild(price);
    cardBody.appendChild(category);
    cardBody.appendChild(addToCartButton);
    cardBody.appendChild(saveButton);

    card.appendChild(cardBody);

    col.appendChild(card);

    container.appendChild(col);
  });
}

// Funzione per eseguire il fetch dei libri
function fetchBooks() {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((data) => {
      // Controlla il valore della barra di ricerca
      const searchInput = document.getElementById("search-input").value;

      if (searchInput && searchInput.length >= 3) {
        // Filtra i libri se nella barra di ricerca ci sono 3 o piu caratteri
        const filteredBooks = data.filter((book) =>
          book.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        displayBooks(filteredBooks);
      } else if (searchInput.length === 1 || searchInput.length === 2) {
        // Non fare nulla se ci sono 1 o 2 caratteri
        return;
      } else {
        // Mostra tutti i libri se la barra di ricerca non ha valore o ha meno di 3 caratteri
        displayBooks(data);
      }
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la richiesta:", error);
    });
}

// Funzione per gestire l'evento keyup nella barra di ricerca
function handleSearchKeyUp(event) {
  // Verifica se il tasto premuto è il tasto "Invio" (codice 13)
  if (event.keyCode === 13) {
    fetchBooks();
  } else {
    // Altrimenti, esegui la funzione fetchBooks() per ogni altro tasto premuto
    fetchBooks();
  }
}

// Funzione per gestire il click del pulsante "Cerca"
function handleSearchButtonClick() {
  fetchBooks();
}

// Aggiunge l'evento keyup all'elemento della barra di ricerca nel DOM
document
  .getElementById("search-input")
  .addEventListener("keyup", handleSearchKeyUp);

// Aggiunge l'evento click al pulsante "Cerca" nel DOM
document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);

// Funzione per gestire l'aggiunta del libro al carrello
function handleAddToCartButtonClick(event) {
  const card = event.target.closest(".card");
  const titleElement = card.querySelector(".card-title");
  const bookTitle = titleElement.textContent;

  // Si può utilizzare il titolo del libro o altre informazioni per aggiungere il prodotto al carrello
  // Aggiungere qui la logica per aggiungere il prodotto al carrello

  console.log("Prodotto aggiunto al carrello:", bookTitle);
}

// Funzione per gestire il salvataggio del libro tra i preferiti
function handleSaveButtonClick(event) {
  const card = event.target.closest(".card");
  const titleElement = card.querySelector(".card-title");
  const bookTitle = titleElement.textContent;

  console.log("Libro salvato:", bookTitle);
}
