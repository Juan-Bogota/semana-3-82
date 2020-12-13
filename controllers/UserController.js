//exporta cada uno de los metodos

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.signin = async (req, res, next) => {
    try {
        const user = await models.user.findOne({ where: { email: req.body.email } });// consulta base de datos validar usuario
        //user es un objeto con la consulta de la base de datos
        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                const token = jwt.sign({
                    id: user.id,
                    nombre: user.username,
                    rol: user.rol,
                    email: user.email
                }, 'cadena secreta', {
                    expiresIn: 86400
                }); // 1- en este token se envia los datos del usuario necesarios al frontend encriptados
                // 2- string secreto en el cual se encripta el token
                // tiempo que expira el token en sg
                res.status(200).send({
                    auth: true, accessToken: token, user: user // datos hacia el front
                })
            } else {
                res.status(401).json({
                    //error: 'Error en la validacion',// status(401) => indica error de parametros
                    auth: false, accessToken: null,
                    reason: "Invalid Password!"
                })
            }
        } else {
            res.status(404).json({
                error: 'User Not Found' // status(404) => No encontrado
            })
        }

    } catch (error) {
        res.status(500).send({
            message: 'Error!!!'
        })
        next(error); // para que continue y no se quede en el catch 
    }
}


//listar y register
exports.listar = async (req, res, next) => {
    try {
        const users = await models.user.findAll();
        res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}

exports.register = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        const user = await models.user.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}

// actualizar validar como se actualiza
exports.actualizar = async (req, res, next) => {
    try {
        //const user = await Usuario.findByEmailAndUpdate({ where: { email: req.body.email }}, {nombre: req.body.nombre} );// consulta base de datos validar usuario and update nombre

    } catch (error) {
        next(error);
    }
}

