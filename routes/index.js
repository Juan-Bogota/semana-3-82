const router = require('express').Router();
const apiRouterUser = require('./api/auth');

router.use('/auth', apiRouterUser); //ruta => /api/auth


module.exports = router;