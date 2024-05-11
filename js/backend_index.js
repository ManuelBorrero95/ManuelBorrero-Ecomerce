
  function createItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'bg-white shadow-md rounded-lg overflow-hidden';
  
    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.alt = item.name;
    image.className = 'w-full h-64 object-cover';
  
    const contentDiv = document.createElement('div');
    contentDiv.className = 'p-4';
  
    const title = document.createElement('h2');
    title.textContent = item.name;
    title.className = 'text-xl font-semibold mb-2';
  
    const description = document.createElement('p');
    description.textContent = item.description;
    description.className = 'text-gray-700 mb-4';
  
    const price = document.createElement('p');
    price.textContent = 'Prezzo: $' + item.price.toFixed(2);
    price.className = 'text-gray-900 font-semibold';
  
    const detailsButton = document.createElement('button');
    detailsButton.textContent = 'Dettagli';
    detailsButton.className = 'mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600';
    
    // Aggiungi l'evento di click per il pulsante "Dettagli"
    detailsButton.addEventListener('click', function() {
      // Redirect alla pagina di dettaglio del prodotto con l'ID come query string
      window.location.href = `./backend_detail.html?id=${item._id}`;
    });
  
    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(price);
    contentDiv.appendChild(detailsButton);
  
    itemDiv.appendChild(image);
    itemDiv.appendChild(contentDiv);
  
    return itemDiv;
  }
  
  // Funzione per ottenere i dati dal server e renderizzare gli elementi
  function fetchAndRenderItems() {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c"
  
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
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
      .then(data => {
        const itemsContainer = document.getElementById('itemsContainer');
        data.forEach(item => {
          const itemElement = createItemElement(item);
          itemsContainer.appendChild(itemElement);
        });
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });
  }
  
  // Chiamata alla funzione per ottenere e renderizzare gli elementi al caricamento della pagina
  fetchAndRenderItems();

