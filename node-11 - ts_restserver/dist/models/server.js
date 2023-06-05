"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_routes_1 = __importDefault(require("../routes/usuario_routes"));
class Server {
    constructor() {
        this.paths = {
            usuarios: 'api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        this.routes();
    }
    routes() {
        this.app.use(this.paths.usuarios, usuario_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puesto: ', this.port, '!');
        });
    }
    ;
}
exports.default = Server;
//# sourceMappingURL=server.js.map