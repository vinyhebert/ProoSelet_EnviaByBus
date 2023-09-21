"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizeData = void 0;
const insertTrans = require("../models/insertTrans");
const validateCPF = require("../models/validateCPF");
const validateDate = require("../models/validateDate");
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
//# sourceMappingURL=transactionController.js.map