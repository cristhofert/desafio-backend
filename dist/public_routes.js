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
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
var router = express_1.Router();
// signup route, creates a new user in the DB
//Users
router.get('/user', utils_1.safe(actions.getUsers));
router.get('/user/:id', utils_1.safe(actions.getUser));
router.post('/user', utils_1.safe(actions.createUser));
router.put('/user', utils_1.safe(actions.updateUser));
router["delete"]('/user/:id', utils_1.safe(actions.deleteUser));
//Empresa
router.get('/empresa', utils_1.safe(actions.getEmpresas));
router.get('/empresa/:RUT', utils_1.safe(actions.getEmpresa));
router.post('/empresa', utils_1.safe(actions.createEmpresa));
router.put('/empresa', utils_1.safe(actions.updateEmpresa));
router["delete"]('/empresa/:RUT', utils_1.safe(actions.deleteEmpresa));
//Persona
router.get('/persona', utils_1.safe(actions.getPersonas));
router.get('/persona/:email', utils_1.safe(actions.getPersona));
router.post('/persona', utils_1.safe(actions.createPersona));
router.put('/persona', utils_1.safe(actions.updatePersona));
router["delete"]('/persona/:id', utils_1.safe(actions.deletePersona));
//Localidad
router.get('/localidad', utils_1.safe(actions.getLocalidades));
router.get('/localidad/:id', utils_1.safe(actions.getLocalidad));
router.post('/localidad', utils_1.safe(actions.createLocalidad));
router.put('/localidad', utils_1.safe(actions.updateLocalidad));
router["delete"]('/localidad/:id', utils_1.safe(actions.deleteLocalidad));
//Departamento
router.get('/departamento', utils_1.safe(actions.getDepartamentos));
router.get('/departamento/:id', utils_1.safe(actions.getDepartamento));
router.post('/departamento', utils_1.safe(actions.createDepartamento));
router.put('/departamento', utils_1.safe(actions.updateDepartamento));
router["delete"]('/departamento/:id', utils_1.safe(actions.deleteDepartamento));
exports["default"] = router;
