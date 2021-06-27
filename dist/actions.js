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
exports.__esModule = true;
exports.deleteEmpresaPersona = exports.updateEmpresaPersona = exports.getEmpresaPersona = exports.getEmpresaPersonas = exports.createEmpresaPersona = exports.deleteDepartamento = exports.updateDepartamento = exports.getDepartamento = exports.getDepartamentos = exports.createDepartamento = exports.deleteLocalidad = exports.updateLocalidad = exports.getLocalidad = exports.getLocalidades = exports.createLocalidad = exports.deletePersona = exports.updatePersona = exports.getPersona = exports.getPersonas = exports.createPersona = exports.deleteEmpresa = exports.updateEmpresa = exports.getEmpresa = exports.getEmpresas = exports.createEmpresa = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var Empresa_1 = require("./entities/Empresa");
var utils_1 = require("./utils");
var Persona_1 = require("./entities/Persona");
var Departamento_1 = require("./entities/Departamento");
var Localidad_1 = require("./entities/Localidad");
var Empresa_Persona_1 = require("./entities/Empresa_Persona");
//USER
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.username)
                    throw new utils_1.Exception("Please provide a username");
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                if (!req.body.is_admin)
                    throw new utils_1.Exception("Please provide is is_admin");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne({ where: { username: req.params.username } })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUser = getUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.username)
                    throw new utils_1.Exception("Please provide a username");
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                if (!req.body.is_admin)
                    throw new utils_1.Exception("Please provide is is_admin");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not exist");
                userRepo.merge(user, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)["delete"](req.params.id)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.deleteUser = deleteUser;
//Empresa
var createEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresaRepo, empresa, newEmpresa, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.razon_social)
                    throw new utils_1.Exception("Please provide a razon_social");
                if (!req.body.nombre_fantasia)
                    throw new utils_1.Exception("Please provide an nombre_fantasia");
                if (!req.body.RUT)
                    throw new utils_1.Exception("Please provide a RUT");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide is email");
                if (!req.body.celular)
                    throw new utils_1.Exception("Please provide is celular");
                if (!req.body.telefono)
                    throw new utils_1.Exception("Please provide is telefono");
                if (!req.body.nro_BPS)
                    throw new utils_1.Exception("Please provide is nro_BPS");
                if (!req.body.nro_referencia)
                    throw new utils_1.Exception("Please provide is nro_referencia");
                if (!req.body.actividad_principal)
                    throw new utils_1.Exception("Please provide is actividad_principal");
                if (!req.body.actividad_secunadria)
                    throw new utils_1.Exception("Please provide is actividad_secunadria");
                if (!req.body.fecha_afiliacion)
                    throw new utils_1.Exception("Please provide is fecha_afiliacion");
                if (!req.body.fecha_inicio_empresa)
                    throw new utils_1.Exception("Please provide is fecha_inicio_empresa");
                if (!req.body.estado)
                    throw new utils_1.Exception("Please provide is estado");
                if (!req.body.fecha_de_baja)
                    throw new utils_1.Exception("Please provide is fecha_de_baja");
                if (!req.body.observaciones)
                    throw new utils_1.Exception("Please provide is observaciones");
                if (!req.body.imagen)
                    throw new utils_1.Exception("Please provide is imagen");
                empresaRepo = typeorm_1.getRepository(Empresa_1.Empresa);
                return [4 /*yield*/, empresaRepo.findOne({ where: { RUT: req.body.RUT } })];
            case 1:
                empresa = _a.sent();
                if (empresa)
                    throw new utils_1.Exception("Empresas already exists with this RUT");
                newEmpresa = typeorm_1.getRepository(Empresa_1.Empresa).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(newEmpresa)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createEmpresa = createEmpresa;
var getEmpresas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).find()];
            case 1:
                empresas = _a.sent();
                return [2 /*return*/, res.json(empresas)];
        }
    });
}); };
exports.getEmpresas = getEmpresas;
var getEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresa;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ where: { RUT: req.params.RUT } })];
            case 1:
                empresa = _a.sent();
                return [2 /*return*/, res.json(empresa)];
        }
    });
}); };
exports.getEmpresa = getEmpresa;
var updateEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresaRepo, empresa, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.razon_social)
                    throw new utils_1.Exception("Please provide a razon_social");
                if (!req.body.nombre_fantasia)
                    throw new utils_1.Exception("Please provide an nombre_fantasia");
                if (!req.body.RUT)
                    throw new utils_1.Exception("Please provide a RUT");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide is email");
                if (!req.body.celular)
                    throw new utils_1.Exception("Please provide is celular");
                if (!req.body.telefono)
                    throw new utils_1.Exception("Please provide is telefono");
                if (!req.body.nro_BPS)
                    throw new utils_1.Exception("Please provide is nro_BPS");
                if (!req.body.nro_referencia)
                    throw new utils_1.Exception("Please provide is nro_referencia");
                if (!req.body.actividad_principal)
                    throw new utils_1.Exception("Please provide is actividad_principal");
                if (!req.body.actividad_secunadria)
                    throw new utils_1.Exception("Please provide is actividad_secunadria");
                if (!req.body.fecha_afiliacion)
                    throw new utils_1.Exception("Please provide is fecha_afiliacion");
                if (!req.body.fecha_inicio_empresa)
                    throw new utils_1.Exception("Please provide is fecha_inicio_empresa");
                if (!req.body.estado)
                    throw new utils_1.Exception("Please provide is estado");
                if (!req.body.fecha_de_baja)
                    throw new utils_1.Exception("Please provide is fecha_de_baja");
                if (!req.body.observaciones)
                    throw new utils_1.Exception("Please provide is observaciones");
                if (!req.body.imagen)
                    throw new utils_1.Exception("Please provide is imagen");
                empresaRepo = typeorm_1.getRepository(Empresa_1.Empresa);
                return [4 /*yield*/, empresaRepo.findOne({ where: { RUT: req.body.RUT } })];
            case 1:
                empresa = _a.sent();
                if (!empresa)
                    throw new utils_1.Exception("Empresa not exist");
                empresaRepo.merge(empresa, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(empresa)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateEmpresa = updateEmpresa;
var deleteEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa)["delete"](req.params.RUT)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.deleteEmpresa = deleteEmpresa;
//Persona
var createPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personaRepo, persona, newPersona, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                if (!req.body.apellido)
                    throw new utils_1.Exception("Please provide a apellido");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.celular)
                    throw new utils_1.Exception("Please provide a celular");
                if (!req.body.estado)
                    throw new utils_1.Exception("Please provide is estado");
                personaRepo = typeorm_1.getRepository(Persona_1.Persona);
                return [4 /*yield*/, personaRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                persona = _a.sent();
                if (persona)
                    throw new utils_1.Exception("Persona already exists with this email");
                newPersona = personaRepo.create(req.body);
                return [4 /*yield*/, personaRepo.save(newPersona)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPersona = createPersona;
var getPersonas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personas;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Persona_1.Persona).find()];
            case 1:
                personas = _a.sent();
                return [2 /*return*/, res.json(personas)];
        }
    });
}); };
exports.getPersonas = getPersonas;
var getPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var persona;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Persona_1.Persona).findOne({ where: { email: req.params.email } })];
            case 1:
                persona = _a.sent();
                return [2 /*return*/, res.json(persona)];
        }
    });
}); };
exports.getPersona = getPersona;
var updatePersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personaRepo, p, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                if (!req.body.apellido)
                    throw new utils_1.Exception("Please provide a apellido");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.celular)
                    throw new utils_1.Exception("Please provide a celular");
                if (!req.body.estado)
                    throw new utils_1.Exception("Please provide is estado");
                personaRepo = typeorm_1.getRepository(Persona_1.Persona);
                return [4 /*yield*/, personaRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                p = _a.sent();
                if (!p)
                    throw new utils_1.Exception("User not exist");
                personaRepo.merge(p, req.body);
                return [4 /*yield*/, personaRepo.save(p)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updatePersona = updatePersona;
var deletePersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)["delete"](req.params.id)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.deletePersona = deletePersona;
//Localidad
var createLocalidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var localidadRepo, localidad, newLocalidad, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                localidadRepo = typeorm_1.getRepository(Localidad_1.Localidad);
                return [4 /*yield*/, localidadRepo.findOne({ where: { nombre: req.body.nombre } })];
            case 1:
                localidad = _a.sent();
                if (localidad)
                    throw new utils_1.Exception("Localidad already exists with this nombre");
                newLocalidad = localidadRepo.create(req.body);
                return [4 /*yield*/, localidadRepo.save(newLocalidad)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createLocalidad = createLocalidad;
var getLocalidades = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var localidades;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Localidad_1.Localidad).find()];
            case 1:
                localidades = _a.sent();
                return [2 /*return*/, res.json(localidades)];
        }
    });
}); };
exports.getLocalidades = getLocalidades;
var getLocalidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var localidad;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Localidad_1.Localidad).findOne(req.params.id)];
            case 1:
                localidad = _a.sent();
                return [2 /*return*/, res.json(localidad)];
        }
    });
}); };
exports.getLocalidad = getLocalidad;
var updateLocalidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var localidadRepo, localidad, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.id)
                    throw new utils_1.Exception("Please provide a id");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                localidadRepo = typeorm_1.getRepository(Localidad_1.Localidad);
                return [4 /*yield*/, localidadRepo.findOne(req.body.id)];
            case 1:
                localidad = _a.sent();
                if (!localidad)
                    throw new utils_1.Exception("Localidad not exist");
                localidadRepo.merge(localidad, req.body);
                return [4 /*yield*/, localidadRepo.save(localidad)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateLocalidad = updateLocalidad;
var deleteLocalidad = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Localidad_1.Localidad)["delete"](req.params.id)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.deleteLocalidad = deleteLocalidad;
//Departamento
var createDepartamento = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var departamentoRepo, departamento, newDepartamento, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                departamentoRepo = typeorm_1.getRepository(Departamento_1.Departamento);
                return [4 /*yield*/, departamentoRepo.findOne({ where: { nombre: req.body.nombre } })];
            case 1:
                departamento = _a.sent();
                if (departamento)
                    throw new utils_1.Exception("Departamento already exists with this nombre");
                newDepartamento = departamentoRepo.create(req.body);
                return [4 /*yield*/, departamentoRepo.save(newDepartamento)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createDepartamento = createDepartamento;
var getDepartamentos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var departamentoes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento).find()];
            case 1:
                departamentoes = _a.sent();
                return [2 /*return*/, res.json(departamentoes)];
        }
    });
}); };
exports.getDepartamentos = getDepartamentos;
var getDepartamento = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var departamento;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento).findOne(req.params.id)];
            case 1:
                departamento = _a.sent();
                return [2 /*return*/, res.json(departamento)];
        }
    });
}); };
exports.getDepartamento = getDepartamento;
var updateDepartamento = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var departamentoRepo, departamento, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.id)
                    throw new utils_1.Exception("Please provide a id");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                departamentoRepo = typeorm_1.getRepository(Departamento_1.Departamento);
                return [4 /*yield*/, departamentoRepo.findOne(req.body.id)];
            case 1:
                departamento = _a.sent();
                if (!departamento)
                    throw new utils_1.Exception("Departamento not exist");
                departamentoRepo.merge(departamento, req.body);
                return [4 /*yield*/, departamentoRepo.save(departamento)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateDepartamento = updateDepartamento;
var deleteDepartamento = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento)["delete"](req.params.id)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.deleteDepartamento = deleteDepartamento;
//EmpresaPersona
var createEmpresaPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var persona, empresa, empresaPersonaRepo, newEmpresaPersona, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.empresaId)
                    throw new utils_1.Exception("Please provide a empresa");
                if (!req.body.personaId)
                    throw new utils_1.Exception("Please provide a persona");
                return [4 /*yield*/, typeorm_1.getRepository(Persona_1.Persona).findOne(req.body.personaId)];
            case 1:
                persona = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne(req.body.empresaId)];
            case 2:
                empresa = _a.sent();
                if (persona && empresa)
                    throw new utils_1.Exception("Persona and Empresa relationship exists");
                empresaPersonaRepo = typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona);
                newEmpresaPersona = empresaPersonaRepo.create(req.body);
                return [4 /*yield*/, empresaPersonaRepo.save(newEmpresaPersona)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createEmpresaPersona = createEmpresaPersona;
var getEmpresaPersonas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresaPersonaes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona).find()];
            case 1:
                empresaPersonaes = _a.sent();
                return [2 /*return*/, res.json(empresaPersonaes)];
        }
    });
}); };
exports.getEmpresaPersonas = getEmpresaPersonas;
var getEmpresaPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresaPersona;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona).findOne({ where: { empresa: req.params.empresaId, persona: req.params.personaId } })];
            case 1:
                empresaPersona = _a.sent();
                return [2 /*return*/, res.json(empresaPersona)];
        }
    });
}); };
exports.getEmpresaPersona = getEmpresaPersona;
var updateEmpresaPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresaPersonaRepo, empresaPersona, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.empresaId)
                    throw new utils_1.Exception("Please provide a empresa");
                if (!req.body.personaId)
                    throw new utils_1.Exception("Please provide a persona");
                empresaPersonaRepo = typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona);
                return [4 /*yield*/, empresaPersonaRepo.findOne({ where: { empresa: req.params.empresaId, persona: req.params.personaId } })];
            case 1:
                empresaPersona = _a.sent();
                if (!empresaPersona)
                    throw new utils_1.Exception("EmpresaPersona not exist");
                empresaPersonaRepo.merge(empresaPersona, req.body);
                return [4 /*yield*/, empresaPersonaRepo.save(empresaPersona)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateEmpresaPersona = updateEmpresaPersona;
var deleteEmpresaPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresaPersona, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona).findOne({ where: { empresa: req.params.empresaId, persona: req.params.personaId } })];
            case 1:
                empresaPersona = _a.sent();
                if (!empresaPersona)
                    throw new utils_1.Exception("EmpresaPersona not exist");
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona)["delete"](empresaPersona)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.send(results)];
        }
    });
}); };
exports.deleteEmpresaPersona = deleteEmpresaPersona;
