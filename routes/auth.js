/* 

   path: api/login

*/
const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// ruta
router.post( '/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password')
    .notEmpty().withMessage('El password es obligatorio')
    .isLength({ min: 6 }).withMessage('El password debe ser de 6 caracteres'),
    validarCampos
] ,crearUsuario );

router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isEmpty(),
], login);

// validarJWT
router.get( '/renew', validarJWT ,renewToken );


module.exports = router;