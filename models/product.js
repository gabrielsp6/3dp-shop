import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String, 
    price: Number,
    material: Number,
    materialType: String,
    hoursToPrint: Number,
    description: String,
    image: String

});

// module.exports = mongoose.model('Product', productSchema)

export let Product = mongoose.model('Product', productSchema)
export default Product

