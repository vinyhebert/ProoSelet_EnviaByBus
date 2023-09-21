"use strict";
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
exports.default = router;
//# sourceMappingURL=routes.js.map