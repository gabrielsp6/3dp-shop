import express from 'express'
import orderRoutes from './routes/order.js'
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv  from 'dotenv'
import path from 'path';
import {fileURLToPath} from 'url';
import exp from 'constants'

dotenv.config()

console.log(process.env.DB_PASS)

//connect to mongo
mongoose.connect('mongodb+srv://gabrielpojar6:' + process.env.DB_PASS + '@cluster0.qo5bxby.mongodb.net/3dpshop?retryWrites=true&w=majority', 
    {
        usenewUrlParser: true,
        useUnifiedTopology:true,

    }
)
mongoose.Promise = global.Promise;

//cart and products list
export let productList = []
export let cartArray = []
let ordersArray = []

//generate products list (database not implemented yet)
for(let i = 1; i <= 9; i++) {
  productList.push
  ({id: `${i}`,
    title: `product-title${i}`,
    image: `${i}.png`,
    description: `this is product number ${i}`,
    price: 10+i
  
})
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.static('public'))
app.use('/order', orderRoutes)
app.use('/cart', cartRoutes)
app.use('/products', productRoutes)
app.set('view engine', 'ejs')


app.use(morgan('dev'));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// app.use(express.json())


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 
//   'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   if(req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//       return res.status(200).json({});
//   }
//   next();
// })


//works only in index.js
//needs investigation
// app.post('/products', (req, res, next) => {
//   cartArray.push( {
//   //product:  productList.filter(product => product.id === req.body.id ),
//     quantity: req.body.quantity,
//     productId: req.body.id
//   })
//   res.sendFile(path.join(__dirname, '.', 'views', 'cart-added.html'));
// })

// app.post('*', (req, res) => {
//   // res.render( res.render(path.join(__dirname, 'views', 'cart.ejs')), {cartArray})
//   console.log('#### CURRENT SHOPPING CART ###')
//   console.table(cartArray)
//   res.send(`You added in cart ${req.body.quantity} items of product with id ${req.body.id}`)
// })


//works only in index.js
//needs investigation
// app.post('/order', function(req, res) {
//   ordersArray.push({id: req.body.id, qty: req.body.qty, price: req.body.price})
//   console.log('### ORDERS ###')
//   console.table(ordersArray)
//   cartArray = []
//   res.sendFile(path.join(__dirname, '.', 'views', 'orderinfo.html'));
// });

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'))
})

app.listen(3000, () => {
    console.log('---------------server running -----------')
})


//export product list (no database yet)
export default productList;