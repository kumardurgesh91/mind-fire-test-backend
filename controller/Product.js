let ProductModel = require('./../model/Product');
let ErrorMessage = require('./../errors.js');

exports.get = async function(req, res, next) {
    const id = req.param('id');
    try {
        const product = await ProductModel.findOne({_id:id});
        if(!product) {
            return res.status(400).send(ErrorMessage.PRODUCT_ID_INVALID);
        }
        return res.status(200).send(product);
    } catch(e) {
        return next(e);
    }
}

exports.update = async function(req, res, next) {
    let {name, price, rating} = req.body;
    const id = req.param('id');
    if(name && name == '') {
        return res.status(400).send(ErrorMessage.PRODUCT_NAME_MISSING);
    }
    
    if(price && typeof price != 'number') {
        return res.status(400).send(ErrorMessage.PRODUCT_PRICE_NUMBER);
    }
    if(rating && typeof rating != 'number') {
        return res.status(400).send(ErrorMessage.PRODUCT_RATING_NUMBER);
    }
    const update = {
        updated_at: new Date(),
    }
    
    if(name) {
        update.name = name;
    }
    if(price) {
        update.price = price;
    }
    if(rating) {
        update.rating = rating;
    }
    
    try {
        let count = await ProductModel.update({_id:id}, update);
        if(count.nModified == 0) {
            return res.status(400).send(ErrorMessage.PRODUCT_ID_INVALID);
        }
        return res.status(200).send(true);
    } catch(e) {
        throw new Error(e);
    }
}

exports.create = async function(req, res, next) {
    
    let {name, price, rating} = req.body;
    
    if(!name) {
        return res.status(400).send(ErrorMessage.PRODUCT_NAME_MISSING);
    }
    if(!price) {
        return res.status(400).send(ErrorMessage.PRODUCT_PRICE_MISSING);
    }
    
    if(!rating) {
        return res.status(400).send(ErrorMessage.PRODUCT_RATING_MISSING);
    }
    
    if(typeof price != 'number') {
        return res.status(400).send(ErrorMessage.PRODUCT_PRICE_NUMBER);
    }
    if(typeof rating != 'number') {
        return res.status(400).send(ErrorMessage.PRODUCT_RATING_NUMBER);
    }
    
    var productModel = new ProductModel();
    productModel.name = name;
    productModel.price = price;
    productModel.rating = parseInt(rating);
    productModel.created_by = req.auth_user._id;
    try {
        let product = await productModel.save();
        return res.status(200).send(product);
    } catch(err) {
        throw new Error(err);
    }
}

exports.list = async function(req, res, next) {
    try {
        let products = await ProductModel.find({created_by:req.auth_user._id});
        return res.status(200).send(products);
    } catch(e) {
        throw new Error(e);
    }
}

exports.delete = async function(req, res, next) {
    const id = req.param('id');
    try {
        let count = await ProductModel.remove({_id:id});
        if(count.n == 0) {
            return res.status(400).send(ErrorMessage.PRODUCT_ID_INVALID);
        }
        return res.status(200).send(true);
    } catch(e) {
        throw new Error(e);
    }
}