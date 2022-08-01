console.log('prova campo minato 2')

// estrapolo il pulsante per generare la griglia
const playButtonElement = document.querySelector('.play-button');

// estrapolo GRIGLIA
const gridElement = document.querySelector('.grid');

// estrapolo la SELECT della difficoltà
const selectElement = document.querySelector('select[name="difficolta"]');

// estrapolo RISULTATO
const risultatoFinale = document.querySelector('.risultato');

// --------------------

// lego la mia funzione che avvia il gioco, ad un eventListener sul pulsante play
playButtonElement.addEventListener('click', startGame)
// senza parentesi!
// -----------------
// creo un ARRAY VUOTO da utilizzare per generare le mie 'bombe'
let posizioneBombe = [];
// creo variabile per inizializzare punteggio
let punteggio = 0;


// FUNZIONI
// -------------------------------------------

// creo funzione che genera la CELLA
function creaCella() {
    // crea l'elemento
    const el = document.createElement('div');
    // aggiunge la classe cella
    el.classList.add('cella');
    // aggancio l'event che riconosce la posizione della bomba
    el.addEventListener('click', onClick);


    // ritorna elemento creato

    return el
}
// -------------------------------------------

// creo funzione che genera GRIGLIA

function creaGriglia(dimensioneGriglia) {
    // genera le celle
    const numeroCelle = dimensioneGriglia ** 2
    // creo ciclo che genera celle
    for (let i = 0; i < numeroCelle; i++) {
        // creo costante che equivale alla funzione CreaCella
        const cella = creaCella();
        // modifico la flex-basis in base al n di celle
        cella.style.flexBasis = `${100 / dimensioneGriglia}%`
        // genero i numeri delle celle utilizzando la DATASET 
        cella.dataset.numero = i + 1
        // appendo le mie celle nella griglia
        gridElement.append(cella);
    }
}
// ------------------------------------

// creo funzione che mi genera la griglia in base alla DIFFICOLTA'

function calcolaDimensioneGriglia(difficolta) {
    // variabile che mi indica la dimensione di default
    let dimensione = 10;
    // condizione per cambiare la dimensione della griglia
    // prendendo come valore i VALUE della select
    if (difficolta === 'difficile') {
        dimensione = 9;
    } else if (difficolta === 'impossibile') {
        dimensione = 7;
    }

    // ritorna il risultato

    return dimensione;
}
// ---------------------------------

// creo funzione per AVVIARE il gioco 
function startGame() {

    // per resettare la mia griglia ad ogni nuova partita 
    resetGame();

    // in base al valore della select :
    const difficoltaSelected = selectElement.value;
    console.log(difficoltaSelected);

    // calcolo dimensione griglia in base alla value della select 
    let dimensione = calcolaDimensioneGriglia(difficoltaSelected);

    // dopo che ho calcolato la dimensione della mia griglia con la funzione
    // genero bombe e la loro posizione

    posizioneBombe = generaBombe(dimensione ** 2);
    console.log(posizioneBombe);

    // creo la griglia in base alla dimensione calcolata dalla select 
    creaGriglia(dimensione);


    // LEGO LA MIA FUNZIONE AL BOTTONE PLAY, CON EVENT LISTENER CLICK
}
// ----------------------------------

// creo funzione per RESETTARE la mia partita
function resetGame() {
    // svuoto la griglia dal suo contenuto
    gridElement.innerHTML = '';
    // svuoto il punteggio
    punteggio = 0;
    risultatoFinale.innerHTML = '';
}

// -------------------

// creo la funzione per generare le bombe con una funzione random 
// che mi generi un array 

function generaBombe(max) {
    // genero 16 numeri non duplicati tra 1 e max
    // mi creo array da ritornare
    const bombe = [];
    // creo un ciclo di numeri random
    while (bombe.length < 16) {
        // genero un numero casuale con la funzione RandomINT ( vedi sotto)
        const n = getRandomIntInclusive(1, max)
        // se n non è presente nell'array : allora pusho 
        // usando la proprietà includes degli array
        if (!bombe.includes(n)) {
            bombe.push(n);
        }


    }
    // ritorna il risultato da usare
    return bombe;

} //------------> devo crearmi o "cercare online" la funzione che genera
// numeri interi random --->

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);

}

// ------------------

// creo la funzione che in base alla posizione della bomba, attribuisce una classe
// al click di quest' ultima

function onClick() {
    // mi salvo il numero della cella da DATASET
    const numeroCella = parseInt(this.dataset.numero);
    console.log(numeroCella);
    console.log(posizioneBombe.includes(numeroCella)); // darà un valore booleano

    // creo variabile per applicare classe default
    let className = 'success'
    // condizione, se la posizione della bomba corrisponde alla mia cella cliccata, 
    // aggiungiamo una classe diversa
    if (posizioneBombe.includes(numeroCella)) {
        className = 'danger';
        gameOver();


    } else {
        punteggio++

    }

    this.classList.add(className);
}

// --------------

// creo la funzione per generare i punti 
function gameOver() {
    risultatoFinale.innerHTML = ` punteggio finale : ${punteggio}`;

}