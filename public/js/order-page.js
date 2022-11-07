const deleteBut = document.getElementById('delete-order')
const orderId = document.getElementById('order-id').textContent
const xhr = new XMLHttpRequest()


deleteBut.addEventListener('click', () => {

    console.log(`clicked button and order id is ${orderId}`)
    xhr.open("DELETE", `http://localhost:3000/order/${orderId}`)
    xhr.send();

})
