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
exports.Localidad = void 0;
var Departamento_1 = require("./Departamento");
var typeorm_1 = require("typeorm");
var Localidad = /** @class */ (function (_super) {
    __extends(Localidad, _super);
    function Localidad() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Localidad_1 = Localidad;
    var Localidad_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Localidad.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Localidad.prototype, "nombre");
    __decorate([
        typeorm_1.ManyToOne(function () { return Departamento_1.Departamento; }, function (departamento) { return departamento.id; }),
        __metadata("design:type", Departamento_1.Departamento)
    ], Localidad.prototype, "departamento");
    __decorate([
        typeorm_1.OneToMany(function () { return Localidad_1; }, function (localidad) { return localidad.id; }),
        __metadata("design:type", Array)
    ], Localidad.prototype, "localidad");
    Localidad = Localidad_1 = __decorate([
        typeorm_1.Entity()
    ], Localidad);
    return Localidad;
}(typeorm_1.BaseEntity));
exports.Localidad = Localidad;