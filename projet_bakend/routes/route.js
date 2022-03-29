let express = require('express');
const controlleur = require('../controllers/controlleurs');
const { valider ,validerConnection} = require('../middleware/validator');
let router= express.Router();



router.get('/',controlleur.accueil);
router.get('/connection',controlleur.connectionGet)
router.get('/connection/:id',controlleur.connectionToken)
router.post('/connection',validerConnection,controlleur.connectionPost)
router.get('/inscription',controlleur.inscriptionGet)
router.post('/inscription',valider,controlleur.inscriptionPost)
router.get('/message',controlleur.message)
router.get('/profil',controlleur.profil)
router.get('/logout',controlleur.logout)









module.exports= router;