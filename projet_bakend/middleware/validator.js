const { body } = require("express-validator");

exports.valider = [
    body('nom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Nom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
        body('prenom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Prenom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
    body('email')
        .notEmpty()
        .withMessage('e-mail est requis'),
    body('email')
        .exists()
        .isEmail()
        .withMessage('email non valide'),
    body('nce')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Numero Carte Etudient obligatoire')
        .isLength({min:12 , max:13})
        .withMessage('Le Numero doit etre de 12 caractères '),
        // .isAlpha()
        // .withMessage('Pas de chaine de caractères'),
    body('numero')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Numero de Telephone obligatoire')
        .isMobilePhone()
        .withMessage('chiffres'),
        // .isAlpha()
        // .withMessage('Pas de chaine de caractères')
    body('confirmer_password')
        .trim()
        .isLength({min:6, max:16})
       .withMessage('Le mot de passe doit comporter entre 6 et 16 caractères')
       .custom(async (confirmer_password, {req}) => {
        const password = req.body.password
   
        if(password !== confirmer_password){
          throw new Error('Les mots de passe doivent être identiques')
        }
    }),


]


exports.validerConnection =[
body('email')
    .notEmpty()
    .withMessage('e-mail est requis'),
body('email')
    .exists()
    .isEmail()
    .withMessage('email non valide'),
body('password')
    .trim()
    .isLength({min:6, max:16})
   .withMessage('Le mot de passe doit comporter entre 6 et 16 caractères')

]

