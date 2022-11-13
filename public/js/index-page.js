console.log('index page')

const ordersContainer = document.querySelector(".orders-container")



//get all orders as json from server and display in a container on homepage
fetch("http://localhost:3000/order/alljson")
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(JSON.stringify(data))
        return data;

    })
    .then(data => {
        console.log(Object.entries(data))
        console.log(Object.keys(data))
        for (const [key, value] of Object.entries(data)) {
            let i = 0;
            for (order of value) {

                console.log(value[i]["_id"])
                console.log(value[i]["price"])

                const orderDiv = document.createElement('div');
                orderDiv.textContent = ` order id: ${value[i]["_id"]}, price:  ${value[i]["price"]}, in progress`;
                orderDiv.classList.add('order')
                ordersContainer.append(orderDiv)

                i++;
            }

        }

    })