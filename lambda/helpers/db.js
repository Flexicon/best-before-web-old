const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// Schemas
const ProductSchema = mongoose.Schema({ name: String, expiryDate: Date, created_by: { id: String, name: String } })

ProductSchema.statics.findByUserID = function (id) {
  return this.find({ 'created_by.id': id }).sort({ expiryDate: 1 })
}

// Models
const Product = mongoose.model('Product', ProductSchema)

exports.Product = Product
