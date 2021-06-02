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
exports.PerfilProfesional = void 0;
var typeorm_1 = require("typeorm");
var Estudio_1 = require("./Estudio");
var Experiencia_1 = require("./Experiencia");
var Certificacion_1 = require("./Certificacion");
var Idioma_1 = require("./Idioma");
var RegistroProfesional_1 = require("./RegistroProfesional");
var PerfilProfesional = /** @class */ (function (_super) {
    __extends(PerfilProfesional, _super);
    function PerfilProfesional() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], PerfilProfesional.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PerfilProfesional.prototype, "nombre");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PerfilProfesional.prototype, "apellido");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PerfilProfesional.prototype, "descripcion");
    __decorate([
        typeorm_1.OneToMany(function () { return Estudio_1.Estudio; }, function (estudio) { return estudio.perfilProfesional; }),
        __metadata("design:type", Array)
    ], PerfilProfesional.prototype, "estudios");
    __decorate([
        typeorm_1.OneToMany(function () { return Experiencia_1.Experiencia; }, function (experiencia) { return experiencia.perfilProfesional; }),
        __metadata("design:type", Array)
    ], PerfilProfesional.prototype, "experiencias");
    __decorate([
        typeorm_1.OneToMany(function () { return Certificacion_1.Certificacion; }, function (certificacion) { return certificacion.perfilProfesional; }),
        __metadata("design:type", Array)
    ], PerfilProfesional.prototype, "certificaciones");
    __decorate([
        typeorm_1.OneToMany(function () { return Idioma_1.Idioma; }, function (idioma) { return idioma.perfilProfesional; }),
        __metadata("design:type", Array)
    ], PerfilProfesional.prototype, "idiomas");
    __decorate([
        typeorm_1.OneToOne(function () { return RegistroProfesional_1.RegistroProfesional; }, function (registroProfesional) { return registroProfesional.perfil; }),
        __metadata("design:type", RegistroProfesional_1.RegistroProfesional)
    ], PerfilProfesional.prototype, "registro");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PerfilProfesional.prototype, "github");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PerfilProfesional.prototype, "linkedin");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PerfilProfesional.prototype, "twitter");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], PerfilProfesional.prototype, "facebook");
    PerfilProfesional = __decorate([
        typeorm_1.Entity()
    ], PerfilProfesional);
    return PerfilProfesional;
}(typeorm_1.BaseEntity));
exports.PerfilProfesional = PerfilProfesional;
