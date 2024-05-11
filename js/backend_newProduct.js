var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c"
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const imageUrlInput = document.getElementById('imageUrl');
    const imageUrl = imageUrlInput.value.trim();
    
    const finalImageUrl = imageUrl === '' ? 'https://picsum.photos/id/1/200/300' : imageUrl;

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
            imageUrl: finalImageUrl
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
        openSuccessModal(); 
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('brand').value = '';
        document.getElementById('price').value = '';
        document.getElementById('imageUrl').value = '';
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
    });
});

function openSuccessModal() {
    document.getElementById('successModal').classList.remove('hidden');
}
  
function closeSuccessModal() {
    document.getElementById('successModal').classList.add('hidden');
}
  
document.getElementById('closeModal').addEventListener('click', function() {
    closeSuccessModal(); 
});
