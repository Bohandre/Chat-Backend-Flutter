const { response } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");


// creación de usuario
const crearUsuario = async (req, res = response) => {
    
    const { email, password } = req.body;
    console.log(email, password);
    try {

        // ! Validar si el corrreo ya existe
        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }
        // !

        // ? Crear usuario
        const usuario = new Usuario(req.body);

        // * Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        //

        await usuario.save();

        // * Generar mi JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

// Login
const login = async (req, res = response) => {

    const { email, password } = req.body;

    console.log(email, password);

    try {
        // ! Validar email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // ! Validar Password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }


        // ?  Generar el JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })


    } catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
}

// * Renovar el token
const renewToken = async ( req, res = response ) => {
    console.log(req);

    // * Obtener el uid
    const uid = req.uid;

    // * Generar el nuevo JWT
    const newToken = await generarJWT( uid );

    // * Obtener el usuario
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        usuario,
        newToken
    });

}


module.exports = {
    crearUsuario,
    login,
    renewToken
}