/*
    Path: /api/messages
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { getChatMessages } = require("../controllers/messages");

const router = Router();

router.get("/:de", validarJWT, getChatMessages);

module.exports = router;
