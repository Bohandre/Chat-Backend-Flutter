const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");
const {
  usuarioConectado,
  usuarioDesconectado,
  saveMessage,
} = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);

  // Verificar autenticación
  if (!valido) {
    return client.disconnect();
  }

  // Cliente autenticado
  usuarioConectado(uid);

  // Ingresar al usuario a una sala en particular
  // Sala global, client.id
  client.join(uid);

  // client.to( uid ).emit('')

  // Escuchar del cliente el personal-message
  client.on("personal-message", async (payload) => {
    console.log(payload);

    // Grabar mensaje
    await saveMessage(payload);

    io.to(payload.para).emit("personal-message", payload);
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");

    usuarioDesconectado(uid);
  });

  // client.on('mensaje', ( payload ) => {
  //     console.log('Mensaje', payload);

  //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

  // });
});
