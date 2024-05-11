const API_URL = "https://striveschool-api.herokuapp.com/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c";

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
    fetch(`${API_URL}/product/${productId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta.');
        }
        return response.json();
    })
    .then(product => {
        renderProductDetails(product);
        setupDeleteButton(productId);
    })
    .catch(handleError);
}

function deleteProduct(productId) {
    fetch(`${API_URL}/product/${productId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta.');
        }
        showConfirmationModal();
        setTimeout(() => {
            hideConfirmationModal();
            window.location.href = './backend_index.html';
        }, 2500);
    })
    .catch(handleError);
}

function renderProductDetails(product) {
    document.getElementById('productImage').src = product.imageUrl;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productPrice').textContent = `Prezzo: €${product.price.toFixed(2)}`;
}

function setupDeleteButton(productId) {
    document.getElementById('deleteButton').addEventListener('click', () => {
        deleteProduct(productId);
    });
}

function handleError(error) {
    console.error('Si è verificato un errore:', error);
}

function showConfirmationModal() {
    document.getElementById('confirmationModal').classList.remove('hidden');
}

function hideConfirmationModal() {
    document.getElementById('confirmationModal').classList.add('hidden');
}

const productId = getParameterByName('id');
if (productId) {
    fetchProductDetails(productId);
} else {
    console.error('ID del prodotto non fornito.');
    alert('ID del prodotto non fornito.');
    window.location.href = 'index.html';
}

document.getElementById('editButton').addEventListener('click', () => {
    window.location.href = `/backend_update.html?id=${productId}`;
});
