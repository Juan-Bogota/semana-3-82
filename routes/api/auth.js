const router = require('express').Router();
const userController = require('../../controllers/UserController.js');


// api/auth/lista
router.get('/lista', userController.listar);

// api/user/register

router.post('/register', userController.register);

// tarea metodos al controller
router.post('/signin', userController.signin);

// actualizar un valor
router.put('/actualizar', userController.actualizar)


module.exports = router;