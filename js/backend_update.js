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

function fetchProductDetails(productId) {
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

function updateProduct(productId, formData) {
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
        showUpdateSuccessModal();
        setTimeout(function(){
            hideUpdateSuccessModal();
            window.location.href = './backend_index.html';
        }, 2500);       
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante l\'aggiornamento del prodotto.');
    });
}

const productId = getParameterByName('id');
if (productId) {
    fetchProductDetails(productId);
} else {
    console.error('ID del prodotto non fornito.');
    alert('ID del prodotto non fornito.');
    window.location.href = '/backend_index.html';
}

document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);

    updateProduct(productId, formData);
});

function showUpdateSuccessModal() {
    const modal = document.getElementById('updateSuccessModal');
    modal.classList.remove('hidden');
}

function hideUpdateSuccessModal() {
    const modal = document.getElementById('updateSuccessModal');
    modal.classList.add('hidden');
}

document.getElementById('closeModalButton').addEventListener('click', function() {
    hideUpdateSuccessModal();
});


document.getElementById("btn-cancel").addEventListener('click', function() {
    window.location.href = `./backend_detail.html?id=${productId}`;
});