import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productsWithQuantity: { type: Array },
    totalPrice: Number,
    address: String,
    userName: String,
    accepted: { type: Boolean, default: false },
    status: String

});

// module.exports = mongoose.model('Order', orderSchema)
let Order = mongoose.model('Order',orderSchema)

export default Order