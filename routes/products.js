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


export default router;