import path from 'path';
import {fileURLToPath} from 'url';
import mongoose from 'mongoose';
import Product from '../models/product.js'
import bodyParser from 'body-parser'


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let cartArray = []

//import cart from server ( no db yet)
// import { cartArray } from '../index.js'
// import productList from '../index.js'

import express from 'express'
const router = express.Router()

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  console.log('user accessed shopping cart')
  next()
  
})

router.post('/', (req, res) => {
  // res.render( res.render(path.join(__dirname, 'views', 'cart.ejs')), {cartArray})
  
    let product = Product.findById(req.body.id)

    product.exec( (err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log("product added in cart")
        cartArray.push({ product: res, quantity: req.body.quantity})
      }
    })


    console.table(cartArray)
    // .exec()
    // .then(() => {
    //   console.log('#### CURRENT SHOPPING CART ###')
    //   console.table(cartArray)

    //   cartArray.push({ product: product, quantity: req.body.quantity})
    // })
    
  
   
  
  // cartArray.push({ id:req.body.id, quantity: req.body.quantity})

  // res.send(`You added in cart ${req.body.quantity} items of product with id ${req.body.id}`)
 res.sendFile(path.join(__dirname, '..' ,'views', 'cart-added.html'))

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
          // console.table(cartArray)
          // console.log(JSON.stringify(cartArray))
          // console.log(docs)
          console.log('added items in cart')
          res.render(path.join(__dirname, '..', 'views', 'cart.ejs'), {cartArray : cartArray, productList : docs });
   
  })

  
  })




export default router;