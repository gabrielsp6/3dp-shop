import express from 'express'
import orderRoutes from './routes/order.js'
import productRoutes from './routes/products.js'
import cartRoutes from './routes/cart.js'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path';
import {
  fileURLToPath
} from 'url';
import exp from 'constants'

dotenv.config()

console.log(process.env.DB_PASS)

mongoose.connect('mongodb+srv://gabrielpojar6:' + process.env.DB_PASS + '@cluster0.qo5bxby.mongodb.net/3dpshop?retryWrites=true&w=majority', {
  usenewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.Promise = global.Promise;


const __filename = fileURLToPath(
  import.meta.url);
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'))
})

app.listen(3000, () => {
  console.log('---server running---')
})