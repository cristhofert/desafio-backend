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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
<<<<<<< HEAD
exports.reportes = exports.login = exports.deleteEmpresaPersona = exports.updateEmpresaPersona = exports.getEmpresasPersonas = exports.getEmpresaPersona = exports.getEmpresaPersonas = exports.createEmpresaPersona = exports.createAsociadoNuevo = exports.deleteDepartamento = exports.updateDepartamento = exports.getDepartamento = exports.getDepartamentos = exports.createDepartamento = exports.deleteLocalidad = exports.updateLocalidad = exports.getLocalidad = exports.getLocalidades = exports.createLocalidad = exports.deletePersona = exports.updatePersona = exports.getPersona = exports.getPersonas = exports.createPersona = exports.getMiAsociados = exports.updateMiEmpresa = exports.getMIEmpresa = exports.deleteEmpresa = exports.updateEmpresa = exports.getEmpresa = exports.getEmpresas = exports.createEmpresa = exports.deleteUser = exports.updateUser = exports.asignarEmpresaAlUsuario = exports.getLocalidadesDeDepartamento = exports.getUser = exports.getUsers = exports.createUser = void 0;
=======
exports.reportes = exports.login = exports.deleteEmpresaPersona = exports.updateEmpresaPersona = exports.getEmpresasPersonas = exports.getEmpresaPersona = exports.getEmpresaPersonas = exports.createEmpresaPersona = exports.deleteDepartamento = exports.updateDepartamento = exports.getDepartamento = exports.getDepartamentosYlocalidades = exports.getDepartamentos = exports.createDepartamento = exports.deleteLocalidad = exports.updateLocalidad = exports.getLocalidad = exports.getLocalidades = exports.createLocalidad = exports.deletePersona = exports.updatePersona = exports.getPersona = exports.getPersonas = exports.createPersona = exports.updateMiEmpresa = exports.getMIEmpresa = exports.deleteEmpresa = exports.updateEmpresa = exports.getEmpresa = exports.getEmpresas = exports.createEmpresa = exports.deleteUser = exports.updateUser = exports.getLocalidadesDeDepartamento = exports.getUser = exports.getUsers = exports.createUser = void 0;
>>>>>>> 43842f56f714ca03e6f56c7838be8bf1baa9c743
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var Empresa_1 = require("./entities/Empresa");
var utils_1 = require("./utils");
var Persona_1 = require("./entities/Persona");
var Departamento_1 = require("./entities/Departamento");
var Localidad_1 = require("./entities/Localidad");
var Empresa_Persona_1 = require("./entities/Empresa_Persona");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Rubro_1 = require("./entities/Rubro");
function validate_isRUT(rut) {
    if (rut.length != 12) {
        return false;
    }
    if (!/^([0-9])*$/.test(rut)) {
        return false;
    }
    var dc = rut.substr(11, 1);
    rut = rut.substr(0, 11);
    var total = 0;
    var factor = 2;
    for (var i = 10; i >= 0; i--) {
        total += (factor * Number(rut.substr(i, 1)));
        factor = (factor == 9) ? 2 : ++factor;
    }
    var dv = 11 - (total % 11);
    if (dv == 11) {
        dv = 0;
    }
    else if (dv == 10) {
        dv = 1;
    }
    if (dv == Number(dc)) {
        return true;
    }
    return false;
}
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
                console.log(users);
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUser = getUser;
var getLocalidadesDeDepartamento = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var departamento, localidades;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento).findOne({ relations: ["localidades"], where: { id: req.params.id } })];
            case 1:
                departamento = _a.sent();
                if (!departamento)
                    throw new utils_1.Exception("No existe el departamento");
                localidades = departamento.localidades;
                return [2 /*return*/, res.json(localidades)];
        }
    });
}); };
exports.getLocalidadesDeDepartamento = getLocalidadesDeDepartamento;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("##################", req.body);
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.username)
                    throw new utils_1.Exception("Please provide a username");
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                if (req.body.is_admin !== true && req.body.is_admin !== false)
                    throw new utils_1.Exception("Please provide is is_admin");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email }, relations: ["empresa"] })];
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
    var empresaRepo, empresa, body, newEmpresa, localidad, results;
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
                if (!req.body.localidadID)
                    throw new utils_1.Exception("Por favor ingresa una Localidad");
                empresaRepo = typeorm_1.getRepository(Empresa_1.Empresa);
                return [4 /*yield*/, empresaRepo.findOne({ where: { RUT: req.body.RUT } })];
            case 1:
                empresa = _a.sent();
                if (empresa)
                    throw new utils_1.Exception("Empresas already exists with this RUT");
                body = req.body;
                newEmpresa = typeorm_1.getRepository(Empresa_1.Empresa).create(body);
                return [4 /*yield*/, typeorm_1.getRepository(Localidad_1.Localidad).findOne({ relations: ["empresa"], where: { id: req.body.localidadID } })];
            case 2:
                localidad = _a.sent();
                console.log(newEmpresa, localidad);
                if (!localidad)
                    throw new utils_1.Exception("La localidad no existe");
                localidad.empresa = __spreadArray(__spreadArray([], localidad.empresa), [newEmpresa]);
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(newEmpresa)];
            case 3:
                results = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Localidad_1.Localidad).save(localidad)];
            case 4:
                _a.sent();
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
                    throw new utils_1.Exception("Por favor ingresa una razon_social");
                if (!req.body.nombre_fantasia)
                    throw new utils_1.Exception("Por favor ingresa un nombre_fantasia");
                if (!req.body.RUT)
                    throw new utils_1.Exception("Por favor ingresa un RUT");
                if (!req.body.email)
                    throw new utils_1.Exception("Por favor ingresa un email");
                if (!req.body.celular)
                    throw new utils_1.Exception("Por favor ingresa un celular");
                if (!req.body.telefono)
                    throw new utils_1.Exception("Por favor ingresa un telefono");
                if (!req.body.nro_BPS)
                    throw new utils_1.Exception("Por favor ingresa un nro_BPS");
                if (!req.body.nro_referencia)
                    throw new utils_1.Exception("Por favor ingresa un nro_referencia");
                if (!req.body.actividad_principal)
                    throw new utils_1.Exception("Por favor ingresa una actividad_principal");
                if (!req.body.actividad_secunadria)
                    throw new utils_1.Exception("Por favor ingresa una actividad_secunadria");
                if (!req.body.fecha_afiliacion)
                    throw new utils_1.Exception("Por favor ingresa una fecha_afiliacion");
                if (!req.body.fecha_inicio_empresa)
                    throw new utils_1.Exception("Por favor ingresa una fecha_inicio_empresa");
                if (!req.body.estado)
                    throw new utils_1.Exception("Por favor ingresa un estado");
                if (!req.body.fecha_de_baja)
                    throw new utils_1.Exception("Por favor ingresa una fecha_de_baja");
                if (!req.body.observaciones)
                    throw new utils_1.Exception("Por favor ingresa observaciones");
                if (!req.body.imagen)
                    throw new utils_1.Exception("Por favor ingresa una imagen");
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
// Mi Empresa
var getMIEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        token = req.user;
        return [2 /*return*/, res.json(token.user.empresa)];
    });
}); };
exports.getMIEmpresa = getMIEmpresa;
var updateMiEmpresa = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, empresaRepo, empresa, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
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
<<<<<<< HEAD
                return [4 /*yield*/, empresaRepo.findOne(token.user.empresa.RUT)];
            case 1:
                empresa = _a.sent();
                if (!empresa || Array.isArray(empresa))
=======
                empresa = token.user.empresa;
                if (!empresa)
>>>>>>> 43842f56f714ca03e6f56c7838be8bf1baa9c743
                    throw new utils_1.Exception("Empresa not exist");
                empresaRepo.merge(empresa, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).save(empresa)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateMiEmpresa = updateMiEmpresa;
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
    var body, personaRepo, p, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                if (!req.body.apellido)
                    throw new utils_1.Exception("Please provide a apellido");
                if (!req.body.emailNuevo)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.emailActual)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.celular)
                    throw new utils_1.Exception("Please provide a celular");
                if (!req.body.estado)
                    throw new utils_1.Exception("Please provide is estado");
                body = {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.emailNuevo,
                    celular: req.body.celular,
                    estado: req.body.estado
                };
                personaRepo = typeorm_1.getRepository(Persona_1.Persona);
                return [4 /*yield*/, personaRepo.findOne({ where: { email: req.body.emailActual } })];
            case 1:
                p = _a.sent();
                if (!p)
                    throw new utils_1.Exception("User not exist");
                personaRepo.merge(p, body);
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
    var localidadRepo, departamento, newLocalidad, existe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.nombre)
                    throw new utils_1.Exception("Por favor ingresa un nombre");
                localidadRepo = typeorm_1.getRepository(Localidad_1.Localidad);
                return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento).findOne({ relations: ["localidades"], where: { id: req.params.id } })];
            case 1:
                departamento = _a.sent();
                if (!departamento)
                    throw new utils_1.Exception("El departamento no existe");
                newLocalidad = localidadRepo.create();
                newLocalidad.nombre = req.body.nombre;
                existe = departamento.localidades.includes(newLocalidad);
                if (!!existe) return [3 /*break*/, 3];
                departamento.localidades.push(newLocalidad);
                return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento).save(departamento)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3: throw new utils_1.Exception("Ya existe una localidad con este nombre");
            case 4: return [2 /*return*/, res.json(newLocalidad)];
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
                if (!req.body.nombre)
                    throw new utils_1.Exception("Please provide a nombre");
                localidadRepo = typeorm_1.getRepository(Localidad_1.Localidad);
                return [4 /*yield*/, localidadRepo.findOne(req.params.id)];
            case 1:
                localidad = _a.sent();
                if (!localidad)
                    throw new utils_1.Exception("La Localidad no existe");
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
                if (!req.body.nombre)
                    throw new utils_1.Exception("Por favor ingresa un nombre para el departamento");
                departamentoRepo = typeorm_1.getRepository(Departamento_1.Departamento);
                return [4 /*yield*/, departamentoRepo.findOne({ where: { nombre: req.body.nombre } })];
            case 1:
                departamento = _a.sent();
                if (departamento)
                    throw new utils_1.Exception("Ya existe un departamento con este nombre");
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
    var departamentos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento).find()];
            case 1:
                departamentos = _a.sent();
                return [2 /*return*/, res.json(departamentos)];
        }
    });
}); };
exports.getDepartamentos = getDepartamentos;
var getDepartamentosYlocalidades = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var departamentos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Departamento_1.Departamento).find({ relations: ["localidades"] })];
            case 1:
                departamentos = _a.sent();
                return [2 /*return*/, res.json(departamentos)];
        }
    });
}); };
exports.getDepartamentosYlocalidades = getDepartamentosYlocalidades;
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
                if (!req.body.id)
                    throw new utils_1.Exception("Por favor ingresa el id del departamento");
                if (!req.body.nombre)
                    throw new utils_1.Exception("Por favor ingresa un nombre para el Departamento");
                departamentoRepo = typeorm_1.getRepository(Departamento_1.Departamento);
                return [4 /*yield*/, departamentoRepo.findOne(req.body.id)];
            case 1:
                departamento = _a.sent();
                if (!departamento)
                    throw new utils_1.Exception("El Departamento con ese nombre no existe");
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
                if (!req.body.cargo)
                    throw new utils_1.Exception("Please provide a persona");
                return [4 /*yield*/, typeorm_1.getRepository(Persona_1.Persona).findOne(req.body.personaId)];
            case 1:
                persona = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).findOne({ where: { RUT: req.body.empresaId } })];
            case 2:
                empresa = _a.sent();
                if (!persona || !empresa)
                    throw new utils_1.Exception("Persona and Empresa relationship exists");
                empresaPersonaRepo = typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona);
                newEmpresaPersona = empresaPersonaRepo.create();
                newEmpresaPersona.persona = persona;
                newEmpresaPersona.empresa = empresa;
                newEmpresaPersona.cargo = req.body.cargo;
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
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona).find({ relations: ["persona", "empresa"] })];
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
var getEmpresasPersonas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var empresaPersona;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona).find({ relations: ["persona", "empresa"], where: { empresa: req.params.empresaId } })];
            case 1:
                empresaPersona = _a.sent();
                return [2 /*return*/, res.json(empresaPersona)];
        }
    });
}); };
exports.getEmpresasPersonas = getEmpresasPersonas;
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
//LOGIN
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.username)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)
                    // We need to validate that a user with this email and password exists in the DB
                ];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { username: req.body.username, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var reportes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _b = (_a = res).json;
                _j = {};
                _c = "Cantidad_total_de_empresa_activos";
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa).count({ where: { activo: true } })];
            case 1:
                _j[_c] = _k.sent();
                _d = "Cantidad total de empresa por rubro de actividad";
                return [4 /*yield*/, typeorm_1.getRepository(Rubro_1.Rubro).createQueryBuilder("rubro")
                        .select("rubro.nombre")
                        .addSelect("COUNT(rubro.empresa)", "count")
                        .groupBy("rubro.nombre")
                        .getRawMany()];
            case 2:
                _j[_d] = _k.sent();
                _e = "Listado de empresa por rubro de actividad";
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa)
                        .createQueryBuilder("empresa")
                        .select("empresa.RUT")
                        .addSelect("empresa.rubro")
                        .groupBy("empresa.rubro")
                        .getRawMany()];
            case 3:
                _j[_e] = _k.sent();
                _f = "Cantidad total de empresa por localidad";
                return [4 /*yield*/, typeorm_1.getRepository(Localidad_1.Localidad).createQueryBuilder("localidad")
                        .select("localidad.nombre")
                        .addSelect("COUNT(localidad.empresa)", "count")
                        .groupBy("localidad.nombre")
                        .getRawMany()];
            case 4:
                _j[_f] = _k.sent(),
                    _j["Altas y bajas del Mes"] = "Altas y bajas del Mes";
                _g = "Aniversario de empresa por mes (fecha de inicio actividad)";
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_1.Empresa)
                        .createQueryBuilder("empresa")
                        .select("empresa.RUT")
                        .addSelect("empresa.fecha_de_inicio_actividad")
                        .distinctOn(["empresa.fecha_de_inicio_actividad"])
                        .orderBy("empresa.fecha_de_inicio_actividad")];
            case 5:
                _j[_g] = _k.sent();
                _h = "Listado de empresa y sus contactos asociados";
                return [4 /*yield*/, typeorm_1.getRepository(Empresa_Persona_1.Empresa_Persona).find({ relations: ['empresa', 'persona'] })];
            case 6: return [2 /*return*/, _b.apply(_a, [(_j[_h] = _k.sent(),
                        _j)])];
        }
    });
}); };
exports.reportes = reportes;
