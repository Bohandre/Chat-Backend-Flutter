const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({


    nombre: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    online: {
        type: Schema.Types.Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( 'Usuario', UsuarioSchema);


