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
exports.getTransError = exports.getTrans = exports.organizeData = void 0;
const insertTrans = require("../models/insertTrans");
const validateCPF = require("../models/validateCPF");
const validateDate = require("../models/validateDate");
const selectTrans = require("../models/selectTrans");
const selectTransError = require("../models/selectTransError");
const storeBalance = require("../models/storeBalance");
//melhorar
const validateDate1 = validateDate;
const validateCPF1 = validateCPF;
// Organizar os dados em objetos com base no esquema de campos
const organizeData = (lines, getField) => {
    const data = [];
    const dataError = [];
    lines.forEach((line) => {
        const rawDate = getField(line, 2, 9); // Formato 'YYYYMMDD'
        const rawCPF = getField(line, 20, 30);
        // Formatado para: 'YYYY-MM-DD'
        const formattedDate = `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`;
        const validateDate = validateDate1.isValidDate(formattedDate);
        const validateCPF = validateCPF1.isValidCPF(rawCPF);
        //Convert
        const valorString = getField(line, 10, 19);
        const valor = parseFloat(valorString);
        const lineData = {
            Tipo: getField(line, 1, 1),
            Data: formattedDate,
            Valor: valor / 100,
            CPF: getField(line, 20, 30),
            Cartao: getField(line, 31, 42),
            'Dono da loja': getField(line, 43, 56),
            'Nome da loja': getField(line, 57, 74),
        };
        if (validateDate && validateCPF) {
            data.push(lineData);
        }
        else {
            dataError.push(lineData);
        }
    });
    console.log('dataError', dataError);
    insertTrans.inserirDadosValidosNoMySQL(data);
    return data;
};
exports.organizeData = organizeData;
const getTrans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataTrans = yield selectTrans.consultarTransValidasNoMySQL();
        const saldoTransPorEmpresa = storeBalance.totalizarValoresPorLoja(dataTrans);
        if (!dataTrans || dataTrans.length === 0) {
            return res.status(404).json({ error: 'Nenhuma transação encontrada' });
        }
        return saldoTransPorEmpresa;
    }
    catch (error) {
        console.error(`Erro no controllerTrans.getTrans`, error);
        return res.status(500).json({ error: 'Erro ao obter transações' });
    }
});
exports.getTrans = getTrans;
const getTransError = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataTransError = yield selectTransError.consultarTransInvalidasNoMySQL();
        if (Array.isArray(dataTransError)) {
            if (dataTransError.length === 0) {
                return res.status(404).json({ error: 'Nenhuma transação encontrada' });
            }
            return dataTransError;
        }
        else {
            return res.status(500).json({ error: 'Erro ao obter transações com falha' });
        }
    }
    catch (error) {
        console.error(`Erro no controllerTrans.getTransError`, error);
        return res.status(500).json({ error: 'Erro ao obter transações com falha' });
    }
});
exports.getTransError = getTransError;
//# sourceMappingURL=transactionController.js.map