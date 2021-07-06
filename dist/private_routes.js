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
router.get('/user', utils_1.safe(actions.getUsers));
router.get('/user/:username', utils_1.safe(actions.getUser));
router.post('/user', utils_1.safe(actions.createUser));
router.put('/user', utils_1.safe(actions.updateUser));
router["delete"]('/user/:id', utils_1.safe(actions.deleteUser));
//Empresa
router.get('/empresa', utils_1.safe(actions.getEmpresas));
router.get('/empresa/:RUT', utils_1.safe(actions.getEmpresa));
router.post('/empresa', utils_1.safe(actions.createEmpresa));
router.put('/empresa', utils_1.safe(actions.updateEmpresa));
router["delete"]('/empresa/:RUT', utils_1.safe(actions.deleteEmpresa));
//mi_empresa
router.get('/mi_empresa/', verifyToken, utils_1.safe(actions.getMIEmpresa));
router.post('/mi_empresa/:RUT/', verifyToken, utils_1.safe(actions.asignarEmpresaAlUsuario));
router.put('/mi_empresa', verifyToken, utils_1.safe(actions.updateMiEmpresa));
//Persona
router.get('/persona', utils_1.safe(actions.getPersonas));
router.get('/persona/:email', utils_1.safe(actions.getPersona));
router.post('/persona', utils_1.safe(actions.createPersona));
router.put('/persona', utils_1.safe(actions.updatePersona));
router["delete"]('/persona/:id', utils_1.safe(actions.deletePersona));
//Localidad
router.get('/localidad', utils_1.safe(actions.getLocalidades));
router.get('/localidad/empresa', utils_1.safe(actions.getLocalidadesEmpresas));
router.get('/localidad/:id', utils_1.safe(actions.getLocalidad));
router.post('/localidad/:id', utils_1.safe(actions.createLocalidad));
router.put('/localidad/:id', utils_1.safe(actions.updateLocalidad));
router["delete"]('/localidad/:id', utils_1.safe(actions.deleteLocalidad));
//rubro
router.get('/rubro', utils_1.safe(actions.getRubros));
router.get('/rubro/:name', utils_1.safe(actions.getRubro));
router.post('/rubro/', utils_1.safe(actions.createRubro));
router.put('/rubro/', utils_1.safe(actions.updateRubro));
router["delete"]('/rubro/:name', utils_1.safe(actions.deleteRubro));
//Departamento
router.get('/departamento', utils_1.safe(actions.getDepartamentos));
router.get('/departamentoYlocalidad', utils_1.safe(actions.getDepartamentosYlocalidades));
router.get('/departamento/:id', utils_1.safe(actions.getDepartamento));
router.post('/departamento', utils_1.safe(actions.createDepartamento));
router.put('/departamento', utils_1.safe(actions.updateDepartamento));
router["delete"]('/departamento/:id', utils_1.safe(actions.deleteDepartamento));
//empresa_persona
router.get('/empresa_persona/:empresaId', utils_1.safe(actions.getEmpresasPersonas));
router.get('/empresa_persona', utils_1.safe(actions.getEmpresaPersonas));
router.get('/empresa_persona/:empresaId/:personaId', utils_1.safe(actions.getEmpresaPersona));
router.post('/empresa_persona', utils_1.safe(actions.createEmpresaPersona));
router.put('/empresa_persona', utils_1.safe(actions.updateEmpresaPersona));
router["delete"]('/empresa_persona/:empresaId/:personaId', utils_1.safe(actions.deleteEmpresaPersona));
//localidades
router.get('/departamento/:id/localidades', utils_1.safe(actions.getLocalidadesDeDepartamento));
exports["default"] = router;
