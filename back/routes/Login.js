const { Router } = require('express');
const router = Router();

const { login, loginUsuario } = require("../controllers/Login");

router.post("/login/post", login); 

router.post("/loginUsuario/post", loginUsuario)


module.exports = router;
