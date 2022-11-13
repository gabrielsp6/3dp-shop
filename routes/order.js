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
  


router.post('/', (req, res, next) => {
    // console.log(req.body)
    const productsWithQuantity  = [];
    const productsIds = req.body.id;
    const quantities = req.body.quantity;
    const titles = req.body.title;

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

    // EMPTY CART WHEN ORDER IS PLACED - DOES NOT WORK PROPERLY
    // fetch('http://localhost:3000/cart/' , {
    //   method: 'DELETE',
    //   })
    //   .then( () => {
    //       console.log('##################user placed order and cart was cleared ###############');
    //   })

    console.log('order saved')

})

router.get('/all', (req, res, next) => {
    Order.find()
    .select('_id totalPrice productsWithQuantity address status accepted')
    .exec()
    .then(docs => {
    res.render(path.join(__dirname, '..', 'views', 'orders.ejs'), { orders: docs})
  
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
  })

  router.get('/alljson', (req, res, next) => {
    Order.find()
    .select('_id totalPrice productsWithQuantity address status accepted')
    .exec()
    .then(docs => {
      console.log(docs.length);
      const response = {
        
        orders: docs.map( doc => {
          return {
            _id: doc._id,
            price: doc.totalPrice
          }
        })
      }

    //get last 5 orders, return reverse array (we need last order to be first displayed in in index)
     let latestOrders = {
        orders: response.orders.slice(response.orders.length-5).reverse()
      }
      console.log(latestOrders)
      res.status(200).json(latestOrders);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
  })

  router.get("/:orderId", (req, res, next) => {
    Order.findById(req.params.orderId)
      .exec()
      .then(order => {
        if (!order) {
          return res.status(404).json({
            message: "Order not found"
          });
        }
        res.render(path.join(__dirname, '..', 'views', 'orderpage.ejs'), { order: order } )
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  

  
  router.delete("/:orderId", (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Order deleted",
        });
        console.log('DELETED ORDER')
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });


  router.patch("/:orderId", (req, res, next) => {
    const newAddress = req.body;
    const id = req.params.orderId;
    try {
      const id = req.params.orderId;
    } catch (error) {
      console.log(error.message)
    }

    console.log(id)
    console.log(newAddress)
    // const updateOps = {};
    // for (const ops of req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }

    const updateOps = {};
    Order.update({ _id: id }, { $set: {address: newAddress} })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'order updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/order/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  

export default router;