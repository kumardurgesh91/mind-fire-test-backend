const mongoose = require('mongoose');
var crypto = require('crypto');
const autoIncrement = require('mongoose-auto-increment');
// Setup schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.nowÏ
    }
});
autoIncrement.initialize(mongoose.connection);
productSchema.plugin(autoIncrement.plugin, 'products');
const ProductModel = module.exports = mongoose.model('products', productSchema);
