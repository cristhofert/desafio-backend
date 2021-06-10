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
exports.Oferta = void 0;
var typeorm_1 = require("typeorm");
var Cualificacion_1 = require("./Cualificacion");
var Habilidad_1 = require("./Habilidad");
var Responsabilidad_1 = require("./Responsabilidad");
var Condicion_1 = require("./Condicion");
var RegistroProfesional_1 = require("./RegistroProfesional");
var Empresa_1 = require("./Empresa");
var Oferta = /** @class */ (function (_super) {
    __extends(Oferta, _super);
    function Oferta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Oferta.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Oferta.prototype, "nombre");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Oferta.prototype, "fecha");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Oferta.prototype, "descripcion");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Oferta.prototype, "politica_teletrabajo");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Oferta.prototype, "estado");
    __decorate([
        typeorm_1.OneToMany(function () { return Cualificacion_1.Cualificacion; }, function (cualificacion) { return cualificacion.oferta; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Oferta.prototype, "cualificaciones");
    __decorate([
        typeorm_1.OneToMany(function () { return Condicion_1.Condicion; }, function (condicion) { return condicion.oferta; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Oferta.prototype, "condiciones");
    __decorate([
        typeorm_1.OneToMany(function () { return Habilidad_1.Habilidad; }, function (habilidad) { return habilidad.oferta; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Oferta.prototype, "habilidades");
    __decorate([
        typeorm_1.OneToMany(function () { return Responsabilidad_1.Responsabilidad; }, function (responsabilidad) { return responsabilidad.oferta; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Oferta.prototype, "responsabilidades");
    __decorate([
        typeorm_1.ManyToOne(function () { return Empresa_1.Empresa; }, function (empresa) { return empresa.ofertas; }),
        __metadata("design:type", Empresa_1.Empresa)
    ], Oferta.prototype, "empresa");
    __decorate([
        typeorm_1.ManyToMany(function () { return RegistroProfesional_1.RegistroProfesional; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Oferta.prototype, "aplicantes");
    Oferta = __decorate([
        typeorm_1.Entity()
    ], Oferta);
    return Oferta;
}(typeorm_1.BaseEntity));
exports.Oferta = Oferta;
