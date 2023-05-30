CREARE UN MARKETPLACE DI LIBRI ONLINE

Sviluppare:
1. Homepage che mostri tutti i libri con card Bootstrap.
2. Ogni card deve avere un pulsante per aggiungere al carrello e uno per salvare un prodotto. Quando si clicca il pulsante che aggiunge il prodotto al carrello:
    a. Aggiungi il libro alla lista del carrello.
    b. Cambia lo stile della card (per mostrare che é stata aggiunto il prodotto), come un bordo colorato o un badge.
3. Una sezione per il carrello.
4. Un input di testo per cercare i libri, che funzioni come barra di ricerca. Quando l'utente scrive piú di tre caratteri, filtra il risultato dell'API per renderizzare solo i libri con titolo corrispondente, anche parzialmente, al contenuto dell'input. TIP: utilizza .filter().

Utilizzare questa API => https://striveschool-api.herokuapp.com/books

Renderizza tutti i libri utiizzando i template literals e .forEach o .map.

EXTRA:
1. Dai la possibilitá all'utente di cancellare libri dal loro carrello.
2. Conta gli elementi nel carrello e mostra il risultato nella sezione carrello.
3. Crea pulsante per svuotare il carello.

Sviluppare:
1. Aggiungere un pulsante "Nascondi" in ogni card, che se cliccata nasconde la card.
2. Aggiungi un pulsante "Scopri" in ogni card, che se cliccata porta l'utente ad una pagina dedicata con i suoi dettagli. TIP: Utilizzare gli URLSearchParams simile a /dettagli.html/?id=1940026091 dove 1940026091 e' l'ASIN

================================================================

DEVELOPER NOTES:

La SEARCHBAR funziona nel seguente modo:
1. Al caricamento della pagina nessun risultato é mostrato.
2. Se la barra é vuota, tutti i risultati vengono mostrati se:
    a. si clicca su Cerca.
    b. si clicca nella barra di ricerca e dá INVIO da tastiera.
3. Se la barra ha 1 o due caratteri, i risultati vengono mostrati solo se si dá INVIO o se si clicca su Cerca.
4. Se la barra di ricerca ha 3 o piú caratteri, i risultati appaiono automaticamente.