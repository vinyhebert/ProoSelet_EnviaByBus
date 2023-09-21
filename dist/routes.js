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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getFieldUpload = require("./models/getFieldUpload");
const transactionController = require("./controllers/transactionController");
const multer_1 = require("multer");
const multer = require("multer");
const router = (0, express_1.Router)();
// Configuração do multer para lidar com o upload de arquivos
const storage = (0, multer_1.memoryStorage)();
const upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        const fileBuffer = req.file.buffer.toString();
        const lines = fileBuffer.split('\n');
        //melhorar isso - colocar na camada Controller
        const getField = getFieldUpload.getField;
        const data = transactionController.organizeData(lines, getField);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar o arquivo.');
    }
});
// Transações + Saldo da loja
router.post('/transByCompany', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transacoes = yield transactionController.getTrans(req, res);
        res.json(transacoes);
    }
    catch (error) {
        console.error('Erro ao obter as transações:', error);
        res.status(500).json({ error: 'Erro ao obter as transações' });
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map