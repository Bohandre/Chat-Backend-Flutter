const Messages = require("../models/message");

const getChatMessages = async (req, res) => {
  // Conocer mi id
  const myId = req.uid;

  // De quien son los mensajes
  const messageFrom = req.params.de;

  // Cargar los últimos 30 mensajes
  const last30 = await Messages.find({
    $or: [
      { de: myId, para: messageFrom },
      { de: messageFrom, para: myId },
    ],
  })
    .sort({ createdAt: "desc" }) // organizar en modo descendente
    .limit(30); // mostrar los últimos 30

  // Respuesta
  res.json({
    ok: true,
    messages: last30,
  });
};

module.exports = {
  getChatMessages,
};
