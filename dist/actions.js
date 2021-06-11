"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.recuperarPass = exports.getOfertas = exports.buscar = exports.getOferta = exports.crearOferta = exports.deleteResponsabilidad = exports.deleteCondicion = exports.deleteHabilidad = exports.deleteCualificacion = exports.deleteIdioma = exports.deleteCertificacion = exports.deleteExperiencia = exports.deleteEstudio = exports.putOferta = exports.editarEmpresa = exports.editarProfesional = exports.putPerfilEmpresa = exports.putPerfilProfesional = exports.cambiarPassRecuperacion = exports.cambiarContraseña = exports.login = exports.obtenerProfesionalLogeado = exports.crearIdioma = exports.crearCertificacion = exports.crearExperiencia = exports.crearEstudio = exports.crearProfesional = exports.crearEmpresa = exports.getCualificacion = exports.getProfesionales = exports.getProfesional = exports.obtenerMiEmpresa = exports.obtenerEmpresa = exports.obtenerEmpresas = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var utils_1 = require("./utils");
var Empresa_1 = require("./entities/Empresa");
var RegistroProfesional_1 = require("./entities/RegistroProfesional");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var PerfilProfesional_1 = require("./entities/PerfilProfesional");
var Estudio_1 = require("./entities/Estudio");
var Experiencia_1 = require("./entities/Experiencia");
var Certificacion_1 = require("./entities/Certificacion");
var Idioma_1 = require("./entities/Idioma");
var Oferta_1 = require("./entities/Oferta");
var Cualificacion_1 = require("./entities/Cualificacion");
var Condicion_1 = require("./entities/Condicion");
var Habilidad_1 = require("./entities/Habilidad");
var Responsabilidad_1 = require("./entities/Responsabilidad");
var bcrypt_1 = __importDefault(require("bcrypt"));
var nodemailer_1 = __importDefault(require("nodemailer"));
// GET
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
var obtenerMiEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                if (token.user instanceof Empresa_1.Empresa)
                    throw new utils_1.Exception("Debe ser una empresa");
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ email: token.user.email })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.obtenerMiEmpresa = obtenerMiEmpresa;
var getProfesional = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).findOne({ relations: ["estudios", "experiencias", "certificaciones", "idiomas"], where: { id: req.params.id } })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getProfesional = getProfesional;
var getProfesionales = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).find({ relations: ["estudios", "experiencias", "certificaciones", "idiomas"] })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getProfesionales = getProfesionales;
var getCualificacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Cualificacion_1.Cualificacion).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getCualificacion = getCualificacion;
// POST
var crearEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesional, nuevaEmpresa, results;
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
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).findOne({ email: req.body.email })];
            case 1:
                profesional = _a.sent();
                if (profesional)
                    throw new utils_1.Exception("Ya existe un profesional con ese email");
                req.body.contrasenna = bcrypt_1["default"].hashSync(req.body.contrasenna, 10);
                nuevaEmpresa = typeorm_1.getRepository(Empresa_1.Empresa).create(__assign(__assign({}, req.body), { ofertas: [] }));
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(nuevaEmpresa)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.crearEmpresa = crearEmpresa;
var crearProfesional = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresa, perfilNuevo, results_perfil, nuevaProfesional, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor, provee una email");
                if (!req.body.contrasenna)
                    throw new utils_1.Exception("Por favor, provee una contraseña");
                req.body.contrasenna = bcrypt_1["default"].hashSync(req.body.contrasenna, 10);
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ email: req.body.email })];
            case 1:
                empresa = _a.sent();
                if (empresa)
                    throw new utils_1.Exception("Ya existe un empresa con ese email");
                perfilNuevo = typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).create({
                    nombre: "",
                    apellido: "",
                    descripcion: "",
                    facebook: "",
                    github: "",
                    linkedin: "",
                    twitter: ""
                });
                return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).save(perfilNuevo)];
            case 2:
                results_perfil = _a.sent();
                nuevaProfesional = typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).create(__assign(__assign({}, req.body), { perfil: perfilNuevo }));
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).save(nuevaProfesional)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json({ results_perfil: results_perfil, results: results })];
        }
    });
}); };
exports.crearProfesional = crearProfesional;
var crearEstudio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesional, nuevoEstudio, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).findOne({ relations: ["estudios"], where: { id: req.params.id } })];
            case 1:
                profesional = _a.sent();
                if (!profesional)
                    throw new utils_1.Exception("No existe el usuario");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Ingrese un nombre del estudio");
                nuevoEstudio = typeorm_1.getRepository(Estudio_1.Estudio).create();
                nuevoEstudio.nombre = req.body.nombre;
                profesional.estudios = __spreadArray(__spreadArray([], profesional.estudios), [nuevoEstudio]);
                return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).save(profesional)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.crearEstudio = crearEstudio;
var crearExperiencia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesional, nuevaExperiencia, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).findOne({ relations: ["experiencias"], where: { id: req.params.id } })];
            case 1:
                profesional = _a.sent();
                if (!profesional)
                    throw new utils_1.Exception("No existe el usuario");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Ingrese un nombre de la experiencia");
                nuevaExperiencia = typeorm_1.getRepository(Experiencia_1.Experiencia).create();
                nuevaExperiencia.nombre = req.body.nombre;
                profesional.experiencias = __spreadArray(__spreadArray([], profesional.experiencias), [nuevaExperiencia]);
                return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).save(profesional)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.crearExperiencia = crearExperiencia;
var crearCertificacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesional, nuevoCertificado, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).findOne({ relations: ["certificaciones"], where: { id: req.params.id } })];
            case 1:
                profesional = _a.sent();
                if (!profesional)
                    throw new utils_1.Exception("No existe el usuario");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Ingrese el nombre de la certificacion");
                nuevoCertificado = typeorm_1.getRepository(Certificacion_1.Certificacion).create();
                nuevoCertificado.nombre = req.body.nombre;
                profesional.certificaciones = __spreadArray(__spreadArray([], profesional.certificaciones), [nuevoCertificado]);
                return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).save(profesional)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.crearCertificacion = crearCertificacion;
var crearIdioma = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesional, nuevoIdioma, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).findOne({ relations: ["idiomas"], where: { id: req.params.id } })];
            case 1:
                profesional = _a.sent();
                if (!profesional)
                    throw new utils_1.Exception("No existe el usuario");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Ingrese el nombre del idioma");
                nuevoIdioma = typeorm_1.getRepository(Idioma_1.Idioma).create();
                nuevoIdioma.nombre = req.body.nombre;
                profesional.idiomas = __spreadArray(__spreadArray([], profesional.idiomas), [nuevoIdioma]);
                return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).save(profesional)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.crearIdioma = crearIdioma;
var obtenerProfesionalLogeado = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, profesional, infoProfesional;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).findOne({ relations: ["perfil"], where: { email: token.user.email } })];
            case 1:
                profesional = _a.sent();
                if (!profesional)
                    throw new utils_1.Exception("Profesional no encontrado");
                return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).findOne({ relations: ["estudios", "experiencias", "certificaciones", "idiomas"], where: { id: profesional.perfil.id } })];
            case 2:
                infoProfesional = _a.sent();
                return [2 /*return*/, res.json(infoProfesional)];
        }
    });
}); };
exports.obtenerProfesionalLogeado = obtenerProfesionalLogeado;
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
                return [4 /*yield*/, profesionalRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                profesional = _a.sent();
                if (!!profesional) return [3 /*break*/, 4];
                return [4 /*yield*/, empresaRepo.findOne({ where: { email: req.body.email } })];
            case 2:
                empresa = _a.sent();
                if (!empresa)
                    throw new utils_1.Exception("Email o contraseña inválido", 401);
                return [4 /*yield*/, bcrypt_1["default"].compare(req.body.contrasenna, empresa.contrasenna).then(function (result) {
                        return !result;
                    })];
            case 3:
                if (_a.sent()) {
                    throw new utils_1.Exception("Email o contraseña inválido", 401);
                }
                user = empresa;
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, bcrypt_1["default"].compare(req.body.contrasenna, profesional.contrasenna).then(function (result) {
                    return !result;
                })];
            case 5:
                if (_a.sent()) {
                    throw new utils_1.Exception("Email o contraseña inválido", 401);
                }
                user = profesional;
                _a.label = 6;
            case 6:
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 24 * 60 * 60 });
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
// PUT
var cambiarContraseña = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, usuario, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                if (!req.body.contrasennaVieja)
                    throw new utils_1.Exception("Por favor, provee la contraseña vieja");
                if (!req.body.contrasennaNueva)
                    throw new utils_1.Exception("Por favor, provee una nueva contraseña");
                if (!(token.user instanceof RegistroProfesional_1.RegistroProfesional)) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).findOne({ email: token.user.email })];
            case 1:
                usuario = _a.sent();
                if (!usuario)
                    throw new utils_1.Exception("El profesional no existe");
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ email: token.user.email })];
            case 3:
                usuario = _a.sent();
                if (!usuario)
                    throw new utils_1.Exception("El empresa no existe");
                _a.label = 4;
            case 4:
                if (req.body.contrasennaVieja != usuario.contrasenna)
                    throw new utils_1.Exception("Contraseña incorrecta");
                usuario.contrasenna = req.body.contrasennaNueva;
                if (!(token.user instanceof RegistroProfesional_1.RegistroProfesional)) return [3 /*break*/, 6];
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).save(usuario)];
            case 5:
                results = _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(usuario)];
            case 7:
                results = _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.cambiarContraseña = cambiarContraseña;
var cambiarPassRecuperacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, empresa, usuario, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                empresa = token.user;
                if (!req.body.nuevaPass)
                    throw new utils_1.Exception("Ingrese una nueva contraseña");
                if (!empresa.comentarios) return [3 /*break*/, 2];
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ email: token.user.email })];
            case 1:
                usuario = _a.sent();
                if (!usuario)
                    throw new utils_1.Exception("La empresa no existe");
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).findOne({ email: token.user.email })];
            case 3:
                usuario = _a.sent();
                if (!usuario)
                    throw new utils_1.Exception("El profesional no existe");
                _a.label = 4;
            case 4:
                usuario.contrasenna = bcrypt_1["default"].hashSync(req.body.nuevaPass, 10);
                if (!empresa.comentarios) return [3 /*break*/, 6];
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(usuario)];
            case 5:
                results = _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).save(usuario)];
            case 7:
                results = _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.cambiarPassRecuperacion = cambiarPassRecuperacion;
var putPerfilProfesional = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesional, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(PerfilProfesional_1.PerfilProfesional).findOne(req.params.id)];
            case 1:
                profesional = _a.sent();
                if (!profesional)
                    throw new utils_1.Exception("No existe", 400);
                PerfilProfesional_1.PerfilProfesional.merge(profesional, req.body);
                return [4 /*yield*/, PerfilProfesional_1.PerfilProfesional.save(profesional)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.putPerfilProfesional = putPerfilProfesional;
var putPerfilEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresa, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne(req.params.id)];
            case 1:
                empresa = _a.sent();
                if (!empresa)
                    throw new utils_1.Exception("No existe", 400);
                Empresa_1.Empresa.merge(empresa, req.body);
                return [4 /*yield*/, Empresa_1.Empresa.save(empresa)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.putPerfilEmpresa = putPerfilEmpresa;
var editarProfesional = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, profesional, profesionalPerfil, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional).findOne({ relations: ["perfil"], where: { email: token.user.email } })];
            case 1:
                profesional = _a.sent();
                if (!profesional)
                    throw new utils_1.Exception("No existe", 400);
                profesionalPerfil = profesional.perfil;
                PerfilProfesional_1.PerfilProfesional.merge(profesionalPerfil, req.body);
                return [4 /*yield*/, PerfilProfesional_1.PerfilProfesional.save(profesionalPerfil)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.editarProfesional = editarProfesional;
var editarEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, empresa, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ email: token.user.email })];
            case 1:
                empresa = _a.sent();
                if (!empresa)
                    throw new utils_1.Exception("No existe", 400);
                Empresa_1.Empresa.merge(empresa, req.body);
                return [4 /*yield*/, Empresa_1.Empresa.save(empresa)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.editarEmpresa = editarEmpresa;
var putOferta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oferta, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Oferta_1.Oferta).findOne(req.params.id)];
            case 1:
                oferta = _a.sent();
                if (!oferta)
                    throw new utils_1.Exception("No existe", 400);
                Oferta_1.Oferta.merge(oferta, req.body);
                return [4 /*yield*/, Oferta_1.Oferta.save(oferta)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.putOferta = putOferta;
// DELETE
var deleteEstudio = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var estudioRepo, estudio, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                estudioRepo = typeorm_1.getRepository(Estudio_1.Estudio);
                return [4 /*yield*/, estudioRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })];
            case 1:
                estudio = _a.sent();
                if (!estudio)
                    throw new utils_1.Exception("El estudio no existe");
                return [4 /*yield*/, estudioRepo["delete"](estudio)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteEstudio = deleteEstudio;
var deleteExperiencia = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var experienciaRepo, experiencia, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                experienciaRepo = typeorm_1.getRepository(Experiencia_1.Experiencia);
                return [4 /*yield*/, experienciaRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })];
            case 1:
                experiencia = _a.sent();
                if (!experiencia)
                    throw new utils_1.Exception("La experiencia no existe");
                return [4 /*yield*/, experienciaRepo["delete"](experiencia)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteExperiencia = deleteExperiencia;
var deleteCertificacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var certificacionRepo, certificacion, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                certificacionRepo = typeorm_1.getRepository(Certificacion_1.Certificacion);
                return [4 /*yield*/, certificacionRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })];
            case 1:
                certificacion = _a.sent();
                if (!certificacion)
                    throw new utils_1.Exception("La certificación no existe");
                return [4 /*yield*/, certificacionRepo["delete"](certificacion)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteCertificacion = deleteCertificacion;
var deleteIdioma = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idiomaRepo, idioma, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idiomaRepo = typeorm_1.getRepository(Idioma_1.Idioma);
                return [4 /*yield*/, idiomaRepo.findOne({ relations: ["perfilProfesional"], where: { id: req.params.id } })];
            case 1:
                idioma = _a.sent();
                if (!idioma)
                    throw new utils_1.Exception("El idioma no existe");
                return [4 /*yield*/, idiomaRepo["delete"](idioma)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteIdioma = deleteIdioma;
var deleteCualificacion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cualificacionRepo, cualificacion, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cualificacionRepo = typeorm_1.getRepository(Cualificacion_1.Cualificacion);
                return [4 /*yield*/, cualificacionRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })];
            case 1:
                cualificacion = _a.sent();
                if (!cualificacion)
                    throw new utils_1.Exception("La cualificacion no existe");
                return [4 /*yield*/, cualificacionRepo["delete"](cualificacion)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteCualificacion = deleteCualificacion;
var deleteHabilidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var habilidadRepo, habilidad, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                habilidadRepo = typeorm_1.getRepository(Habilidad_1.Habilidad);
                return [4 /*yield*/, habilidadRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })];
            case 1:
                habilidad = _a.sent();
                if (!habilidad)
                    throw new utils_1.Exception("La habilidad no existe");
                return [4 /*yield*/, habilidadRepo["delete"](habilidad)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteHabilidad = deleteHabilidad;
var deleteCondicion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var condicionRepo, condicion, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                condicionRepo = typeorm_1.getRepository(Condicion_1.Condicion);
                return [4 /*yield*/, condicionRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })];
            case 1:
                condicion = _a.sent();
                if (!condicion)
                    throw new utils_1.Exception("La condicion no existe");
                return [4 /*yield*/, condicionRepo["delete"](condicion)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteCondicion = deleteCondicion;
var deleteResponsabilidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var responsabilidadRepo, responsabilidad, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                responsabilidadRepo = typeorm_1.getRepository(Responsabilidad_1.Responsabilidad);
                return [4 /*yield*/, responsabilidadRepo.findOne({ relations: ["oferta"], where: { id: req.params.id } })];
            case 1:
                responsabilidad = _a.sent();
                if (!responsabilidad)
                    throw new utils_1.Exception("La responsabilidad no existe");
                return [4 /*yield*/, responsabilidadRepo["delete"](responsabilidad)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteResponsabilidad = deleteResponsabilidad;
var crearArregloRelacion = function (entidad, detallesArray) {
    var repo = typeorm_1.getRepository(entidad);
    var reqDetalles = detallesArray;
    var newDetalles = [];
    reqDetalles.forEach(function (detalleIterable) {
        var nuevoDetalle = repo.create(detalleIterable);
        newDetalles.push(nuevoDetalle);
    });
    return newDetalles;
};
var crearOferta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, empresa, cualificacionesNueva, condicionesNueva, habilidadesNueva, responsabilidadesNueva, oferta, ofertaGuardada, empresaGuardada;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ relations: ["ofertas"], where: { email: token.user.email } })];
            case 1:
                empresa = _a.sent();
                if (!empresa)
                    throw new utils_1.Exception("empresa no esta logeada"); //no se si esto es opcional.
                if (!req.body.nombre)
                    throw new utils_1.Exception("Ingrese un nombre para la oferta");
                if (!req.body.fecha)
                    throw new utils_1.Exception("Ingrese la fecha de la creacion de la oferta");
                if (!req.body.descripcion)
                    throw new utils_1.Exception("Ingrese una descripcion de oferta");
                if (!req.body.presencialidad)
                    throw new utils_1.Exception("Indique si es presencial o remoto");
                if (!req.body.estado)
                    throw new utils_1.Exception("Indique el estado de la oferta");
                if (!req.body.cualificaciones)
                    throw new utils_1.Exception("Ingrese alguna cualificacion");
                if (!req.body.condiciones)
                    throw new utils_1.Exception("Ingrese alguna condicion");
                if (!req.body.habilidades)
                    throw new utils_1.Exception("Ingrese alguna habilidad");
                if (!req.body.responsabilidades)
                    throw new utils_1.Exception("Ingrese alguna responsabilidad");
                cualificacionesNueva = crearArregloRelacion(Cualificacion_1.Cualificacion, req.body.cualificaciones);
                condicionesNueva = crearArregloRelacion(Condicion_1.Condicion, req.body.condiciones);
                habilidadesNueva = crearArregloRelacion(Habilidad_1.Habilidad, req.body.habilidades);
                responsabilidadesNueva = crearArregloRelacion(Responsabilidad_1.Responsabilidad, req.body.responsabilidades);
                oferta = typeorm_1.getRepository(Oferta_1.Oferta).create();
                oferta.nombre = req.body.nombre;
                oferta.fecha = req.body.fecha;
                oferta.descripcion = req.body.descripcion;
                oferta.presencialidad = req.body.presencialidad;
                oferta.estado = req.body.estado;
                oferta.cualificaciones = cualificacionesNueva;
                oferta.condiciones = condicionesNueva;
                oferta.habilidades = habilidadesNueva;
                oferta.responsabilidades = responsabilidadesNueva;
                return [4 /*yield*/, typeorm_1.getRepository(Oferta_1.Oferta).save(oferta)];
            case 2:
                ofertaGuardada = _a.sent();
                console.log(empresa);
                empresa.ofertas = __spreadArray(__spreadArray([], empresa.ofertas), [oferta]);
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(empresa)];
            case 3:
                empresaGuardada = _a.sent();
                return [2 /*return*/, res.json({ empresa: empresaGuardada, oferta: ofertaGuardada })];
        }
    });
}); };
exports.crearOferta = crearOferta;
var getOferta = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oferta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Oferta_1.Oferta).findOne({
                    relations: ["cualificaciones", "condiciones", "habilidades", "responsabilidades"],
                    where: { id: req.params.id }
                })];
            case 1:
                oferta = _a.sent();
                return [2 /*return*/, res.json(oferta)];
        }
    });
}); };
exports.getOferta = getOferta;
var buscar = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var oferta;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Oferta_1.Oferta).find({
                    where: [
                        { nombre: typeorm_1.ILike("%" + req.params.consulta + "%") },
                        { descripcion: typeorm_1.ILike("%" + req.params.consulta + "%") }
                    ]
                })];
            case 1:
                oferta = _a.sent();
                return [2 /*return*/, res.json(oferta)];
        }
    });
}); };
exports.buscar = buscar;
var getOfertas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, empresa, ofertas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ relations: ["ofertas"], where: { email: token.user.email } })];
            case 1:
                empresa = _a.sent();
                if (!empresa)
                    throw new utils_1.Exception("no existe la empresa");
                ofertas = empresa.ofertas;
                return [2 /*return*/, res.json(ofertas)];
        }
    });
}); };
exports.getOfertas = getOfertas;
var recuperarPass = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var profesionalRepo, empresaRepo, profesional, user, empresa, token, tokenSustituido, testAccount, transporter, info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor, especifique un correo en el cuerpo de su solicitud", 400);
                profesionalRepo = typeorm_1.getRepository(RegistroProfesional_1.RegistroProfesional);
                empresaRepo = typeorm_1.getRepository(Empresa_1.Empresa);
                return [4 /*yield*/, profesionalRepo.findOne({ email: req.body.email })];
            case 1:
                profesional = _a.sent();
                if (!!profesional) return [3 /*break*/, 3];
                return [4 /*yield*/, empresaRepo.findOne({ email: req.body.email })];
            case 2:
                empresa = _a.sent();
                if (empresa) {
                    user = empresa;
                }
                return [3 /*break*/, 4];
            case 3:
                user = profesional;
                _a.label = 4;
            case 4:
                if (!user) return [3 /*break*/, 7];
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 24 * 60 * 60 });
                tokenSustituido = token.replace(/\./g, '$');
                return [4 /*yield*/, nodemailer_1["default"].createTestAccount()];
            case 5:
                testAccount = _a.sent();
                testAccount.user = "jobstack16@gmail.com";
                testAccount.pass = process.env.GMAILPASS;
                transporter = nodemailer_1["default"].createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass
                    }
                });
                return [4 /*yield*/, transporter.sendMail({
                        from: '"JobStack" <jobstack16@gmail.com>',
                        to: req.body.email,
                        subject: "Recuperación de contraseña",
                        html: "<p>Si ha solicitado su contrase\u00F1a, por favor ingrese al siguiente <a href=\"" + process.env.FRONTEND + "/recuperarContrase\u00F1a/" + tokenSustituido + "\">link</a>, en caso contrario, omita este email</p>"
                    })];
            case 6:
                info = _a.sent();
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer_1["default"].getTestMessageUrl(info));
                _a.label = 7;
            case 7: return [2 /*return*/, res.json({ message: "OK" })];
        }
    });
}); };
exports.recuperarPass = recuperarPass;
