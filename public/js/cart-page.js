const deleteBut = document.querySelector('#delete-cart')
const productId = document.getElementById('productId')

deleteBut.addEventListener('click', () => {
  fetch('http://localhost:3000/cart/', {
      method: 'DELETE',
    })
    .then(() => {
      console.log('cart cleared');
      alert("cart cleared! please refresh the page!")
    })

})