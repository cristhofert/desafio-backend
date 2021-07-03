"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Empresa = void 0;
var Users_1 = require("./Users");
var Localidad_1 = require("./Localidad");
var typeorm_1 = require("typeorm");
var Empresa_Persona_1 = require("./Empresa_Persona");
var Empresa = /** @class */ (function (_super) {
    __extends(Empresa, _super);
    function Empresa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Empresa.prototype, "razon_social");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "nombre_fantasia");
    __decorate([
        typeorm_1.PrimaryColumn({ unique: true }),
        __metadata("design:type", String)
    ], Empresa.prototype, "RUT");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "direccion");
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], Empresa.prototype, "email");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "celular");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "telefono");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "nro_BPS");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "nro_referencia");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "actividad_principal");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "actividad_secunadria");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "fecha_afiliacion");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "fecha_inicio_empresa");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "estado");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "fecha_de_baja");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "observaciones");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Empresa.prototype, "imagen");
    __decorate([
        typeorm_1.OneToMany(function () { return Localidad_1.Localidad; }, function (localidad) { return localidad.empresa; }),
        __metadata("design:type", Localidad_1.Localidad)
    ], Empresa.prototype, "localidad");
    __decorate([
        typeorm_1.ManyToOne(function () { return Users_1.Users; }, function (user) { return user.empresa; }),
        __metadata("design:type", Array)
    ], Empresa.prototype, "user");
    __decorate([
        typeorm_1.OneToMany(function () { return Empresa_Persona_1.Empresa_Persona; }, function (empresa_persona) { return empresa_persona.empresa; }),
        __metadata("design:type", Array)
    ], Empresa.prototype, "empresa_persona");
    Empresa = __decorate([
        typeorm_1.Entity()
    ], Empresa);
    return Empresa;
}(typeorm_1.BaseEntity));
exports.Empresa = Empresa;
