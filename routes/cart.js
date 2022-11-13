import path from 'path';
import {
  fileURLToPath
} from 'url';
import mongoose from 'mongoose';
import Product from '../models/product.js'
import bodyParser from 'body-parser'


const __filename = fileURLToPath(
  import.meta.url);

const __dirname = path.dirname(__filename);

let cartArray = []

import express from 'express'
const router = express.Router()

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  console.log('user accessed shopping cart')
  next()

})

router.post('/', (req, res) => {

  let product = Product.findById(req.body.id)
  product.exec((err, res) => {
    if (err) {
      console.log(err);

    } else {
      console.log("product added in cart")
      cartArray.push({
        product: res,
        quantity: req.body.quantity
      })
      console.table(cartArray)
    }
  })

  console.table(cartArray)
  res.sendFile(path.join(__dirname, '..', 'views', 'cart-added.html'))

})

router.get('/', (req, res, next) => {

  Product.find()
    .select('title price _id description image')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            title: doc.title,
            price: doc.price,
            description: doc.description,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }
          }
        })
      }
      console.log('added items in cart')
      res.render(path.join(__dirname, '..', 'views', 'cart.ejs'), {
        cartArray: cartArray,
        productList: docs
      });

    })

})

router.delete("/", (req, res, next) => {
  cartArray = [];
  console.table(cartArray)
  res.sendFile(path.join(__dirname, '..', 'views', 'cart-cleared.html'))
});


export default router;