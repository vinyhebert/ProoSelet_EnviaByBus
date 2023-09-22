"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.SECRET;
const login = (req, res) => {
    try {
        // Simulador de DB
        const resUsuarioBDSimulator = {
            email: 'vini@email.com',
            password: '$2b$10$y4XgedrrY5qlhD3BD3Lrsuv/lqcV2bRnpzJjQciOTzSru5DOcpqFC',
            name: 'Vinicius',
        };
        // Validando Usuário
        if (resUsuarioBDSimulator.email !== req.body.email) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Usuário não encontrado!',
                data: {
                    email: req.body.email,
                },
            });
        }
        const validacaoPassword = (0, bcrypt_1.compareSync)(req.body.password, resUsuarioBDSimulator.password);
        if (!validacaoPassword) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Não autorizado!',
            });
        }
        const token = jwt.sign({ name: resUsuarioBDSimulator.name }, SECRET || '', {
            expiresIn: 20 * 60,
        });
        res.status(200).json({
            statusCode: 200,
            message: 'Login realizado com sucesso!',
            data: {
                token,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};
exports.login = login;
const verificarToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!',
        });
    }
    try {
        jwt.verify(token, SECRET || '');
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: 'Token inválido.',
        });
    }
};
exports.verificarToken = verificarToken;
//# sourceMappingURL=authController.js.map