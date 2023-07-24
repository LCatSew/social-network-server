const router = require('express').Router();
const categoryRoutes = require('./thoughts');
const productRoutes = require('./users');

router.use('/thoughts', thoughts);
router.use('/users', userss);

module.exports = router;