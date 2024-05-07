//endpoint per i prodotti


 //end point per key : https://strive.school/studentlogin

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjM5ZTFmMmQ2MzdmMzAwMTVhZGJmNTciLCJpYXQiOjE3MTUwNjk0MjYsImV4cCI6MTcxNjI3OTAyNn0.yvr-0VqDN9BogoYC_n4PqFqFpQkxttZzy69Yo014O2c';
document.addEventListener('DOMContentLoaded', ()=>{

fetch('https://striveschool-api.herokuapp.com/api/product',{
    method:'GET',
    headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    },
).then(response => {

    return response.json();
}).then(data => {
    console.log(data);
    data.forEach(element => {
        
        let container = document.getElementById('container');
        let newProduct = document.createElement('div')
        newProduct.classList.add('card','h-20','w-20','bg-slate-600');       
        let img = document.createElement('img');
        img.src = element.imageUrl;
        container.appendChild(newProduct);
        newProduct.appendChild(img);
        


    });
})

})


function createProduct(){



}
 