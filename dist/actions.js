"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.login = exports.cambiarContraseña = exports.crearProfesional = exports.crearEmpresa = exports.obtenerEmpresa = exports.obtenerEmpresas = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var utils_1 = require("./utils");
var Empresa_1 = require("./entities/Empresa");
var RegistroProfesional_1 = require("./entities/RegistroProfesional");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var obtenerEmpresas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.obtenerEmpresas = obtenerEmpresas;
var obtenerEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.obtenerEmpresa = obtenerEmpresa;
var crearEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nuevaEmpresa, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor, provee un email");
                if (!req.body.contrasenna)
                    throw new utils_1.Exception("Por favor, provee una contraseña");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Por favor, provee un nombre");
                if (!req.body.icono)
                    throw new utils_1.Exception("Por favor, provee un icono");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Por favor, provee una descripcion");
                if (!req.body.departamento)
                    throw new utils_1.Exception("Por favor, provee un departamento");
                if (!req.body.direccion)
                    throw new utils_1.Exception("Por favor, provee una direccion");
                if (!req.body.sitio_web)
                    throw new utils_1.Exception("Por favor, provee un sitio_web");
                if (!req.body.comentarios)
                    throw new utils_1.Exception("Por favor, provee un comentarios");
                if (!req.body.twitter)
                    throw new utils_1.Exception("Por favor, provee una cuenta de twitter");
                if (!req.body.facebook)
                    throw new utils_1.Exception("Por favor, provee una cuenta de facebook");
                if (!req.body.linkedin)
                    throw new utils_1.Exception("Por favor, provee una cuenta de linkedin");
                if (!req.body.github)
                    throw new utils_1.Exception("Por favor, provee una cuenta de github");
                nuevaEmpresa = typeorm_1.getRepository(Empresa_1.Empresa).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(nuevaEmpresa)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.crearEmpresa = crearEmpresa;
var crearProfesional = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nuevaProfesional, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor, provee una email");
                if (!req.body.contrasenna)
                    throw new utils_1.Exception("Por favor, provee una contraseña");
                nuevaProfesional = typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).save(nuevaProfesional)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.crearProfesional = crearProfesional;
var cambiarContraseña = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesional, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).findOne(req.params.id)];
            case 1:
                profesional = _a.sent();
                if (!req.body.contrasennaVieja)
                    throw new utils_1.Exception("Por favor, provee la contraseña vieja");
                if (!req.body.contrasennaNueva)
                    throw new utils_1.Exception("Por favor, provee una nueva contraseña");
                if (!profesional)
                    throw new utils_1.Exception("El profesional no existe");
                if (req.body.contrasennaVieja != profesional.contrasenna)
                    throw new utils_1.Exception("Contraseña incorrecta");
                profesional.contrasenna = req.body.contrasennaNueva;
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).save(profesional)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.cambiarContraseña = cambiarContraseña;
//controlador para el logueo
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesionalRepo, empresaRepo, profesional, user, empresa, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor, especifique un correo en el cuerpo de su solicitud", 400);
                if (!req.body.contrasenna)
                    throw new utils_1.Exception("Por favor, especifique una contraseña en el cuerpo de su solicitud", 400);
                profesionalRepo = typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional);
                empresaRepo = typeorm_1.getRepository(Empresa_1.Empresa);
                return [4 /*yield*/, profesionalRepo.findOne({ where: { email: req.body.email, contrasenna: req.body.contrasenna } })];
            case 1:
                profesional = _a.sent();
                if (!!profesional) return [3 /*break*/, 3];
                return [4 /*yield*/, empresaRepo.findOne({ where: { email: req.body.email, contrasenna: req.body.contrasenna } })];
            case 2:
                empresa = _a.sent();
                if (!empresa)
                    throw new utils_1.Exception("Email o contraseña inválido", 401);
                user = empresa;
                return [3 /*break*/, 4];
            case 3:
                user = profesional;
                _a.label = 4;
            case 4:
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
