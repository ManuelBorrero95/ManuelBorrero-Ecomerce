function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Funzione per ottenere i dettagli del prodotto dal server e visualizzarli sulla pagina
function fetchProductDetails(productId) {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c"

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
        document.getElementById('productImage').src = product.imageUrl;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = 'Prezzo: €' + product.price.toFixed(2);
        
        // Aggiungi l'evento di click per il pulsante "Elimina Prodotto"
        document.getElementById('deleteButton').addEventListener('click', function() {
            deleteProduct(productId);
        });
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}

// Funzione per eliminare il prodotto
function deleteProduct(productId) {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c"

    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta.');
        }
   // Mostra il modal di conferma
   document.getElementById('confirmationModal').classList.remove('hidden');
   // Chiudi il modal dopo 5 secondi e reindirizza alla pagina principale
   setTimeout(function(){
       document.getElementById('confirmationModal').classList.add('hidden');
       window.location.href = 'index.html';
   }, 2500);
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
}

// Ottieni l'ID del prodotto dalla query string
const productId = getParameterByName('id');
if (productId) {
    // Se l'ID del prodotto è presente, ottieni e visualizza i dettagli del prodotto
    fetchProductDetails(productId);
} else {
    // Se l'ID del prodotto non è presente, mostra un messaggio di errore
    console.error('ID del prodotto non fornito.');
    alert('ID del prodotto non fornito.');
    // Reindirizza l'utente alla pagina principale o a un'altra pagina di destinazione
    window.location.href = 'index.html';
}