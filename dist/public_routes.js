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
//usuario
router.post('/recuperarPass', utils_1.safe(actions_1.recuperarPass));
//Empresa
router.get('/empresas', utils_1.safe(actions_1.obtenerEmpresas));
router.get('/empresa/:id', utils_1.safe(actions_1.obtenerEmpresa));
router.post('/empresa', utils_1.safe(actions_1.crearEmpresa));
//profesional
router.get('/profesionales', utils_1.safe(actions_1.getProfesionales));
router.get('/profesional/:id', utils_1.safe(actions_1.getProfesional));
router.post('/registroprofesional', utils_1.safe(actions_1.crearProfesional));
//cualificacion
router.get('/cualificacion', utils_1.safe(actions_1.getCualificacion));
//login
router.post('/login', utils_1.safe(actions_2.login));
//ofertas
router.get('/oferta/:id', utils_1.safe(actions_1.getOferta));
router.get('/buscar/:consulta', utils_1.safe(actions_1.buscar));
exports["default"] = router;
