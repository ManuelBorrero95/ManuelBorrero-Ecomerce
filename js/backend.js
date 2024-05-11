var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c"






document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the default form submission

    // Fetch POST request
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            brand: document.getElementById('brand').value,
            price: document.getElementById('price').value,
            imageUrl: document.getElementById('imageUrl').value
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Dati inviati con successo:', data);
        // Puoi fare altre azioni qui, come mostrare un messaggio di successo

        openSuccessModal(); // Mostra la modale di successo
        // Ripulisci i campi del modulo
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('brand').value = '';
        document.getElementById('price').value = '';
        document.getElementById('imageUrl').value = '';
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        // Puoi gestire l'errore qui, ad esempio mostrando un messaggio all'utente
    });
});
  

function openSuccessModal() {
    document.getElementById('successModal').classList.remove('hidden');
  }
  
  // Funzione per chiudere la modale di successo
  function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
  }
  
  document.getElementById('closeModal').addEventListener('click', function() {
    closeSuccessModal(); // Chiudi la modale di successo
  });