var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c"


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


// Funzione per ottenere i dettagli del prodotto dal server e popolare il modulo di aggiornamento
function fetchProductDetails(productId) {
    // Effettua una richiesta GET per ottenere i dettagli del prodotto dal server
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta.');
        }
        return response.json();
    })
    .then(product => {
        // Popola i campi del modulo di aggiornamento con i dettagli del prodotto
        document.getElementById('name').value = product.name;
        document.getElementById('description').value = product.description;
        document.getElementById('brand').value = product.brand;
        document.getElementById('price').value = product.price;
        document.getElementById('imageUrl').value = product.imageUrl;
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante il recupero dei dettagli del prodotto.');
    });
}

// Funzione per aggiornare il prodotto
function updateProduct(productId, formData) {
    // Effettua una richiesta PUT per aggiornare il prodotto sul server
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: formData.get('name'),
            description: formData.get('description'),
            brand: formData.get('brand'),
            price: formData.get('price'),
            imageUrl: formData.get('imageUrl')
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore durante l\'aggiornamento del prodotto.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Prodotto aggiornato con successo:', data);
        alert('Prodotto aggiornato con successo.');
        // Reindirizza l'utente alla pagina di dettaglio del prodotto dopo l'aggiornamento
        window.location.href = 'dettaglio_prodotto.html?id=' + productId;
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante l\'aggiornamento del prodotto.');
    });
}

// Ottieni l'ID del prodotto dalla query string
const productId = getParameterByName('id');
if (productId) {
    // Se l'ID del prodotto è presente, ottieni e popola il modulo di aggiornamento del prodotto
    fetchProductDetails(productId);
} else {
    // Se l'ID del prodotto non è presente, mostra un messaggio di errore
    console.error('ID del prodotto non fornito.');
    alert('ID del prodotto non fornito.');
    // Reindirizza l'utente alla pagina principale o a un'altra pagina di destinazione
    window.location.href = '/backend_index.html';
}

// Gestisci l'invio del modulo di aggiornamento
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impedisce l'invio del modulo

    // Ottieni i dati dal modulo di aggiornamento
    const formData = new FormData(this);

    // Aggiorna il prodotto utilizzando i dati del modulo di aggiornamento
    updateProduct(productId, formData);
});