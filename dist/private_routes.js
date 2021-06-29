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
var verifyAdmin = function (req, res, next) {
    var token = req.user;
    if (token.user.is_admin)
        next();
    else
        return res.status(400).json('El usuario no es Admin');
};
//Users
router.get('/user', verifyToken, verifyAdmin, utils_1.safe(actions.getUsers));
router.get('/user/:id', verifyToken, verifyAdmin, utils_1.safe(actions.getUser));
router.post('/user', verifyToken, verifyAdmin, utils_1.safe(actions.createUser));
router.put('/user', verifyToken, verifyAdmin, utils_1.safe(actions.updateUser));
router["delete"]('/user/:id', verifyToken, verifyAdmin, utils_1.safe(actions.deleteUser));
//Empresa
router.get('/empresa', verifyToken, verifyAdmin, utils_1.safe(actions.getEmpresas));
router.get('/empresa/:RUT', verifyToken, utils_1.safe(actions.getEmpresa));
router.post('/empresa', verifyToken, verifyAdmin, utils_1.safe(actions.createEmpresa));
router.put('/empresa', verifyToken, utils_1.safe(actions.updateEmpresa));
router["delete"]('/empresa/:RUT', verifyToken, verifyAdmin, utils_1.safe(actions.deleteEmpresa));
//Persona
router.get('/persona', verifyToken, utils_1.safe(actions.getPersonas));
router.get('/persona/:email', verifyToken, verifyAdmin, utils_1.safe(actions.getPersona));
router.post('/persona', verifyToken, verifyAdmin, utils_1.safe(actions.createPersona));
router.put('/persona', verifyToken, verifyAdmin, utils_1.safe(actions.updatePersona));
router["delete"]('/persona/:id', verifyToken, verifyAdmin, utils_1.safe(actions.deletePersona));
//Localidad
router.get('/localidad', verifyToken, utils_1.safe(actions.getLocalidades));
router.get('/localidad/:id', verifyToken, utils_1.safe(actions.getLocalidad));
router.post('/localidad', verifyToken, verifyAdmin, utils_1.safe(actions.createLocalidad));
router.put('/localidad', verifyToken, verifyAdmin, utils_1.safe(actions.updateLocalidad));
router["delete"]('/localidad/:id', verifyToken, verifyAdmin, utils_1.safe(actions.deleteLocalidad));
//Departamento
router.get('/departamento', verifyToken, utils_1.safe(actions.getDepartamentos));
router.get('/departamento/:id', verifyToken, utils_1.safe(actions.getDepartamento));
router.post('/departamento', verifyToken, verifyAdmin, utils_1.safe(actions.createDepartamento));
router.put('/departamento', verifyToken, verifyAdmin, utils_1.safe(actions.updateDepartamento));
router["delete"]('/departamento/:id', verifyToken, verifyAdmin, utils_1.safe(actions.deleteDepartamento));
//empresa_persona
router.get('/empresa_persona', verifyToken, utils_1.safe(actions.getEmpresaPersonas));
router.get('/empresa_persona/:empresaId/:personaId', verifyToken, utils_1.safe(actions.getEmpresaPersona));
router.post('/empresa_persona', verifyToken, verifyAdmin, utils_1.safe(actions.createEmpresaPersona));
router.put('/empresa_persona', verifyToken, verifyAdmin, utils_1.safe(actions.updateEmpresaPersona));
router["delete"]('/empresa_persona/:empresaId/:personaId', verifyToken, verifyAdmin, utils_1.safe(actions.deleteEmpresaPersona));
exports["default"] = router;
