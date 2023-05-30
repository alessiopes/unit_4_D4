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
    price.classList.add("card-text", "product-price", "my-2");
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
    //saveButton.addEventListener("click", handleSaveButtonClick);

    // Creazione del pulsante "Nascondi" per ogni card
    const hideButton = document.createElement("button");
    hideButton.classList.add("btn", "btn-secondary");
    hideButton.textContent = "Nascondi";

    // Aggiunge l'evento click al pulsante "Nascondi"
    hideButton.addEventListener("click", handleHideButtonClick);

    // Crea il pulsante "Scopri"
    const discoverButton = document.createElement("a");
    discoverButton.classList.add("btn", "btn-primary", "mr-2");
    discoverButton.textContent = "Scopri";
    discoverButton.setAttribute("data-asin", book.asin);

    // Aggiungi l'evento click al pulsante "Scopri"
    discoverButton.addEventListener("click", handleDiscoverButtonClick);

    cardBody.appendChild(title);
    cardBody.appendChild(image);
    cardBody.appendChild(price);
    cardBody.appendChild(category);
    cardBody.appendChild(addToCartButton);
    cardBody.appendChild(saveButton);
    cardBody.appendChild(hideButton);
    cardBody.appendChild(discoverButton);

    card.appendChild(cardBody);

    col.appendChild(card);

    container.appendChild(col);
  });
}

////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////

// Funzione per gestire il click del pulsante "Cerca"
function handleSearchButtonClick() {
  fetchBooks();
}

////////////////////////////////////////////////////////////////////////////

// Aggiunge l'evento keyup all'elemento della barra di ricerca nel DOM
document
  .getElementById("search-input")
  .addEventListener("keyup", handleSearchKeyUp);

// Aggiunge l'evento click al pulsante "Cerca" nel DOM
document
  .getElementById("search-button")
  .addEventListener("click", handleSearchButtonClick);

////////////////////////////////////////////////////////////////////////////

// Funzione per aggiungere il prodotto al carrello
function addToCart(product) {
  // Recupera il contenitore del carrello dal DOM
  const cartContainer = document.getElementById("cart-container");

  // Crea un elemento div per rappresentare il prodotto nel carrello
  const productElement = document.createElement("div");
  productElement.classList.add("cart-product");

  // Crea i contenuti per il prodotto (titolo, prezzo, immagine, ecc.)
  const titleElement = document.createElement("h5");
  titleElement.textContent = product.title;

  const priceElement = document.createElement("p");
  priceElement.textContent = "Prezzo: $" + product.price.toFixed(2);

  // Crea il bottone per rimuovere il prodotto dal carrello
  const removeButton = document.createElement("button");
  removeButton.classList.add("btn", "btn-sm", "btn-danger", "ml-2");
  removeButton.innerHTML = "Rimuovi";
  removeButton.addEventListener("click", function () {
    // Rimuovi il prodotto dal carrello
    productElement.remove();

    // Chiamata alla funzione per contare gli elementi iniziali nel carrello
    countCartItems();
  });

  // Crea una linea orizzontale
  const hr = document.createElement("hr");

  // Aggiungi i contenuti al prodotto
  productElement.appendChild(titleElement);
  productElement.appendChild(priceElement);
  productElement.appendChild(removeButton);
  productElement.appendChild(hr);

  // Aggiungi il prodotto al carrello
  cartContainer.appendChild(productElement);
}

////////////////////////////////////////////////////////////////////////////

// Funzione per gestire il click sul pulsante "Aggiungi al carrello"
function handleAddToCartButtonClick(event) {
  // Seleziona la card
  const card = event.target.closest(".card");

  // Seleziona il titolo
  const bookTitle = card.querySelector(".card-title").textContent;

  // Seleziona il prezzo
  const priceElement = card.querySelector(".product-price");
  console.log(priceElement);
  const priceText = priceElement.textContent.replace("Prezzo: $", "");
  const bookPrice = parseFloat(priceText);

  const product = {
    title: bookTitle,
    price: bookPrice,
    //? Aggiungere altre proprietà del prodotto se necessario
  };

  // Aggiungi il prodotto al carrello
  addToCart(product);

  // Chiamata alla funzione per contare gli elementi iniziali nel carrello
  countCartItems();
}

////////////////////////////////////////////////////////////////////////////

// Funzione per contare gli elementi nel carrello
function countCartItems() {
  // Conta gli elementi nel carrello
  const count = document.querySelectorAll(".cart-product").length;

  // Mostra un messaggio di alert con Bootstrap
  const alertContainer = document.getElementById("alert-container");

  if (count > 0) {
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert", "alert-success", "mb-3");
    alertMessage.textContent = `Il carrello contiene ${count} prodotti.`;

    // Rimuovi eventuali messaggi di alert precedenti
    while (alertContainer.firstChild) {
      alertContainer.removeChild(alertContainer.firstChild);
    }

    // Aggiungi l'elemento di chiusura dell'alert
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("close");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("data-dismiss", "alert");
    closeBtn.setAttribute("aria-label", "Chiudi");

    const closeIcon = document.createElement("span");
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times;";

    closeBtn.appendChild(closeIcon);
    alertMessage.appendChild(closeBtn);

    // Aggiungi il messaggio di alert al DOM
    alertContainer.appendChild(alertMessage);
  } else {
    // Se non ci sono prodotti nel carrello, nascondi l'alert
    alertContainer.innerHTML = "";
  }
}

///////////////////////////////////////////////////////////////

// Funzione per svuotare il carrello
function clearCart() {
  // Seleziona il contenitore del carrello dal DOM
  const cartContainer = document.getElementById("cart-container");

  cartContainer.innerHTML = "";

  // Aggiorna il conteggio dei prodotti nel carrello
  countCartItems();
}

/////////////////////////////////////////////////////////////////

// Funzione per gestire il click sul pulsante "Nascondi"
function handleHideButtonClick(event) {
  const card = event.target.closest(".card").parentElement;
  card.style.display = "none";
}

/////////////////////////////////////////////////////////////////

// Funzione per gestire il click sul pulsante "Scopri"
function handleDiscoverButtonClick(event) {
  const asin = event.target.getAttribute("data-asin");
  const url = `https://striveschool-api.herokuapp.com/books/${asin}`;
  
  //window.location.href = `/Unit%204/D4/dettagli.html?id=${asin}`;
  window.location.href = `/unit_4_D4/dettagli.html?id=${asin}`;
}

/////////////////////////////////////////////////////////////////

// Funzione per recuperare i dettagli del libro tramite una richiesta API
function fetchBookDetails(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayBookDetails(data);
    })
    .catch(error => {
      console.error('Errore nella richiesta:', error);
    });
}

////////////////////////////////////////////////////////////////////

// Funzione per gestire la stampa dei dettagli del libro
function displayBookDetails(data) {
  const bookDetailsElement = document.getElementById('book-details');
  bookDetailsElement.innerHTML = ''; // Pulisce eventuali contenuti precedenti

  // Creazione del container principale
  const containerElement = document.createElement('div');
  containerElement.classList.add('row', 'my-4');

  // Creazione dell'elemento immagine
  const bookImageElement = document.createElement('img');
  bookImageElement.src = data.img;
  bookImageElement.classList.add('img-fluid', 'col-lg-4', 'mb-3', 'mb-lg-0');
  containerElement.appendChild(bookImageElement);

  // Creazione del container delle informazioni
  const infoContainerElement = document.createElement('div');
  infoContainerElement.classList.add('col-lg-8');
  containerElement.appendChild(infoContainerElement);

  // Creazione dell'elemento ASIN
  const bookAsinElement = document.createElement('p');
  bookAsinElement.textContent = `ASIN: ${data.asin}`;
  infoContainerElement.appendChild(bookAsinElement);

  // Creazione dell'elemento titolo
  const bookTitleElement = document.createElement('h2');
  bookTitleElement.textContent = data.title;
  infoContainerElement.appendChild(bookTitleElement);

  // Creazione dell'elemento prezzo
  const bookPriceElement = document.createElement('p');
  bookPriceElement.textContent = `Prezzo: $${data.price.toFixed(2)}`;
  infoContainerElement.appendChild(bookPriceElement);

  // Creazione dell'elemento categoria
  const bookCategoryElement = document.createElement('p');
  bookCategoryElement.textContent = `Categoria: ${data.category}`;
  infoContainerElement.appendChild(bookCategoryElement);

  bookDetailsElement.appendChild(containerElement);
}