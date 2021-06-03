"use strict";
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
var actions_1 = require("./actions");
var actions_2 = require("./actions");
var router = express_1.Router();
// signup route, creates a new user in the DB
//Empresa
router.get('/empresas', utils_1.safe(actions_1.obtenerEmpresas));
router.get('/empresa/:id', utils_1.safe(actions_1.obtenerEmpresa));
router.post('/empresa', utils_1.safe(actions_1.crearEmpresa));
router.post('/registoprofesional', utils_1.safe(actions_1.crearProfesional));
router.post('/login', utils_1.safe(actions_2.login));
router.put('/perfilprofesional/:id', utils_1.safe(actions_1.putPerfilProfesional));
router.get('/profesional/:id', utils_1.safe(actions_1.getProfesional));
router["delete"]('/deleteEstudio/:id', utils_1.safe(actions_1.deleteEstudio));
router["delete"]('/deleteExperiencia/:id', utils_1.safe(actions_1.deleteExperiencia));
router["delete"]('/deleteCertificacion/:id', utils_1.safe(actions_1.deleteCertificacion));
router["delete"]('/deleteIdioma/:id', utils_1.safe(actions_1.deleteIdioma));
exports["default"] = router;
