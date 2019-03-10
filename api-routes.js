// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
let userController = require('./controller/User.js');
let productController = require('./controller/Product.js');
let auth = require('./controller/Auth');
// Set default API response
router.get('/', function (req, res, next) {
    return res.send({
       status: 'API Its Working',
       message: 'Welcome to mindfire api',
   });
});

console.log(userController.create);

router.post('/user/login', userController.login);
router.post('/user/register', userController.register);
router.get('/user', auth.authenticate, userController.get);
router.route('/products/:id')
    .get(auth.authenticate, productController.get)
    .put(auth.authenticate, productController.update)
    .delete(auth.authenticate, productController.delete);

router.route('/products')
    .get(auth.authenticate, productController.list)
    .post(auth.authenticate, productController.create);
// Export API routes
module.exports = router;