import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express'
import response from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

import Product from '../models/product.js'

//fake product list
// import productList from '../index.js'



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router()

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

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
        //   console.log(docs)

       
      // if(docs.length >= 0) {
        //   res.status(200).json(response);
          res.render(path.join(__dirname, '..', 'views', 'products.ejs'), { newProductList: docs })
      // } else {
      //     res.status(404).json({
      //         message: "no entries found"
      //     })
      // }
  })
  .catch( err => {
      console.log(err);
      res.status(500).json({
          error:err
      })
  })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id description')
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: "GET",
                    url: 'http://localhost:3000/products/' + req.params.productId
                }
            });
        } else {
            res.status(404).json({message:'No valid entry found for id!'});
        }
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
})

router.post('/', (req, res, next) => {
  

  const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      price: req.body.price,
      title: req.body.title,
      material: req.body.material,
      materialType: req.body.materialtype,
      hoursToPrint: req.body.hourstoprint,
      description: req.body.description,
      image: req.body.image

  })
  product.save()
  .then(result => {
      console.log(result);
      res.status(201).json({
          message: 'created product successfully',
          createdProduct: {
              title: result.title,
              price: result.price,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/products/" + result._id
              }
          }
      })
    
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error:err
      })
  });

 
})


// router.get('/', (req, res, next) => {
//     res.render(path.join(__dirname, '..', 'views', 'products.ejs'), { newProductList: productList })
   
// })

//not working - needs investigation
// router.get('/:id', (req, res) => {
//   res.render(path.join(__dirname, '..', 'views', 'product.ejs'), {id : req.params.id})
// })

// router.post('/:quantity', (req, res) => {
//   console.log(`user added item in cart, quantity ${req.body.quantity}`)
//   res.send(req.body.quantity)
   
// })


// router.get('/:id', (req, res) => {
//   console.log(req.params.id)
//   // res.send(`user accessed product with ${req.params.id}`)
//   res.render(path.join(__dirname, '..', 'views', 'product.ejs'), {id : req.params.id})
   
// })


// router.get('/:id', (req, res) => {
//   res.render(path.join(__dirname, '..', 'views', 'product.ejs'), {id : req.params.id})
   
// })


export default router;