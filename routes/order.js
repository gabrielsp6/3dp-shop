import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express'
import response from 'express'
import mongoose from 'mongoose';
import Product from '../models/product.js'
import Order from '../models/order.js'

import bodyParser from 'body-parser'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()

router.use(bodyParser.urlencoded({
    extended: true
  }));
  router.use(bodyParser.json());
  

// middleware that is specific to this router

// define the home page route
router.get('/', (req, res, next) => {
  Order.find()
  .select('productsWithQuantity accepted _id')
  .exec()
  .then(docs => {
      res.status(200).json({
        order : {
            order: docs
        }
      
       });
  })
  .catch(err => {
      res.status(500).json({
          error: err
      })
  })
})

router.post('/', (req, res, next) => {
    // console.log(req.body)
    const productsWithQuantity  = [];
    const productsIds = req.body.id;
    const quantities = req.body.quantity;
    const titles = req.body.title;
    // titles =  () => {
    //     let titlesCopy = []

    //     for(let i = 0; i < productsIds.length; i++) {
    //         console.log(Product.findById(productsIds[i])
    //         .select('title')
    //         .exec()
    //         .then(doc => {
    //             console.log(doc.title)
    //             console.log("adding to title list")
    //             titlesCopy.push(doc.title)
                
    //         })
    //         )
            
    //     }
    //     return titlesCopy;
    // }

    // console.table(titles)
  
    for( let i = 0; i < productsIds.length; i++) {
        productsWithQuantity.push({ 
            product: productsIds[i],
            quantity: quantities[i],
            title: titles[i]
        })
    }

    console.table(productsWithQuantity)

    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        productsWithQuantity: productsWithQuantity,
        totalPrice: req.body.price,
        address: req.body.address,
        accepted: false,
        status: 'Pending'

        
    })

    order.save()

    console.log('order saved')


    // .then( result => {
//       console.log(result);
//       res.status(201).json({
//           message: 'order stored',
//           createdOrder: {
//               _id: result._id,
//               product: result.product,
//               quantity: result.quantity
//           },
//           request: {
//               type: 'GET',
//               url: "http://localhost:3000/orders" + result._id
//           }
//       });

//       return 
//   })
  // .catch(err => {
  //     res.status(500).json({
  //         message: "Product not found",
  //         err: err
  //     })
  // });
})



//   router.post('/order', function(req, res) {
//   ordersArray.push({id: req.body.id, qty: req.body.qty, price: req.body.price})
//   console.log('### ORDERS ###')
//   console.table(ordersArray)
//   cartArray = []
//   res.sendFile(path.join(__dirname, '.', 'views', 'orderinfo.html'));
// });



// router.post('*', function(req, res) {
//   res.send(JSON.stringify(req.body))
// });

// router.get('/info', function(req, res) {
//   res.sendFile(path.join(__dirname, '..', 'views', 'orderinfo.html'))
// });

export default router;