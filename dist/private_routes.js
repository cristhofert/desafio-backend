"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// declare a new router to include all the endpoints
var router = express_1.Router();
//middleware de verificación
var verifyToken = function (req, res, next) {
    //headers con el token
    var token = req.header('Authorization');
    if (!token)
        return res.status(400).json('ACCESS DENIED');
    var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
};
//cambiar contraseña
router.put('/cambiarcontraseña', verifyToken, utils_1.safe(actions.cambiarContraseña));
router.put('/cambiarPassRecuperacion', verifyToken, utils_1.safe(actions.cambiarPassRecuperacion));
//perfil profesional
router.post('/perfil-profesional/estudio/:id', verifyToken, utils_1.safe(actions.crearEstudio));
router.post('/perfil-profesional/experiencia/:id', verifyToken, utils_1.safe(actions.crearExperiencia));
router.post('/perfil-profesional/certificacion/:id', verifyToken, utils_1.safe(actions.crearCertificacion));
router.post('/perfil-profesional/idioma/:id', verifyToken, utils_1.safe(actions.crearIdioma));
router.get('/perfil-profesional/postulaciones', verifyToken, utils_1.safe(actions.postulacionesProfesional));
router.post('/perfil-profesional/postulaciones', verifyToken, utils_1.safe(actions.postularProfesional));
router.put('/perfil-profesional/postulaciones', verifyToken, utils_1.safe(actions.borrarPostulacion));
router.put('/perfil-profesional/', verifyToken, utils_1.safe(actions.editarProfesional));
router.get('/perfil-profesional/', verifyToken, utils_1.safe(actions.obtenerProfesionalLogeado));
router.put('/perfilProfesional/:id', verifyToken, utils_1.safe(actions.putPerfilProfesional));
//EMPRESA
router.put('/empresa/', verifyToken, utils_1.safe(actions.editarEmpresa));
router.get('/empresa/', verifyToken, utils_1.safe(actions.obtenerMiEmpresa));
router.put('/perfilEmpresa/:id', verifyToken, utils_1.safe(actions.putPerfilEmpresa));
//OFERTAS
router.get('/ofertas', verifyToken, utils_1.safe(actions.getOfertas));
router.post('/oferta', verifyToken, utils_1.safe(actions.crearOferta));
router.put('/oferta/:id', verifyToken, utils_1.safe(actions.putOferta));
//estudio
router["delete"]('/deleteEstudio/:id', verifyToken, utils_1.safe(actions.deleteEstudio));
//experiencia
router["delete"]('/deleteExperiencia/:id', verifyToken, utils_1.safe(actions.deleteExperiencia));
//certificacion
router["delete"]('/deleteCertificacion/:id', verifyToken, utils_1.safe(actions.deleteCertificacion));
//idioma
router["delete"]('/deleteIdioma/:id', verifyToken, utils_1.safe(actions.deleteIdioma));
exports["default"] = router;
