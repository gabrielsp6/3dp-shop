const deleteBut = document.getElementById('delete-order')
const orderId = document.getElementById('order-id').textContent

deleteBut.addEventListener('click', () => {
  fetch('http://localhost:3000/order/' + orderId, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {
      console.log(res)
      alert("order deleted!")
    })

})