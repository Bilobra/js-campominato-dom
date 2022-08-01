console.log('prova campo minato 2')

// estrapolo il pulsante per generare la griglia
const playButtonElement = document.querySelector('.play-button');

// estrapolo GRIGLIA
const gridElement = document.querySelector('.grid');

// estrapolo la SELECT della difficoltà
const selectElement = document.querySelector('select[name="difficolta"]');


// FUNZIONI
// -------------------------------------------
// creo funzione che genera la CELLA
function creaCella() {
    // crea l'elemento
    const el = document.createElement('div');
    // aggiunge la classe cella
    el.classList.add('cella');
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

// creo funzione che mi genera la griglia in base alla difficoltà

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