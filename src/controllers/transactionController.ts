import * as insertTrans from '../models/insertTrans'
import * as validateCPF from '../models/validateCPF'
import * as validateDate from '../models/validateDate'

import { Request, Response } from 'express';
import { Transacao } from '../interfaces/transaction'
import * as selectTrans from '../models/selectTrans';
import * as selectTransError from '../models/selectTransError';
import * as storeBalance from '../models/storeBalance';


//melhorar
const validateDate1 = validateDate
const validateCPF1 = validateCPF

interface LineData {
    Tipo: string;
    Data: string;
    Valor: number;
    CPF: string;
    Cartao: string;
    'Dono da loja': string;
    'Nome da loja': string;
  }
  
  // Organizar os dados em objetos com base no esquema de campos
  export const organizeData = (lines: string[], getField: (line: string, start: number, end: number) => string): LineData[] => {
    const data: LineData[] = [];
    const dataError: LineData[] = [];
  
    lines.forEach((line) => {
      const rawDate = getField(line, 2, 9); // Formato 'YYYYMMDD'
      const rawCPF = getField(line, 20, 30);
      // Formatado para: 'YYYY-MM-DD'
      const formattedDate = `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`;
      const validateDate = validateDate1.isValidDate(formattedDate);
      const validateCPF = validateCPF1.isValidCPF(rawCPF);
  
      //Convert
      const valorString = getField(line, 10, 19);
      const valor = parseFloat(valorString)
  
      const lineData: LineData = {
        Tipo: getField(line, 1, 1),
        Data: formattedDate,
        Valor: valor / 100, // Dividir por 100 para normalizar o valor
        CPF: getField(line, 20, 30),
        Cartao: getField(line, 31, 42),
        'Dono da loja': getField(line, 43, 56),
        'Nome da loja': getField(line, 57, 74),
      };
  
      if (validateDate && validateCPF) {
        data.push(lineData);
      } else {
        dataError.push(lineData);
      }
    });
  
    console.log('dataError', dataError);

    insertTrans.inserirDadosValidosNoMySQL(data);
  
    return data;
  };

  export const getTrans = async (req: Request, res: Response) => {
    try {
      const dataTrans: Transacao[] = await selectTrans.consultarTransValidasNoMySQL();
      const saldoTransPorEmpresa  = storeBalance.totalizarValoresPorLoja(dataTrans);
  
      if (!dataTrans || dataTrans.length === 0) {
        return res.status(404).json({ error: 'Nenhuma transação encontrada' });
      }
  
      return saldoTransPorEmpresa;
    } catch (error) {
      console.error(`Erro no controllerTrans.getTrans`, error);
      return res.status(500).json({ error: 'Erro ao obter transações' });
    }
  };

  export const getTransError = async (req: Request, res: Response) => {
    try {
      const dataTransError = await selectTransError.consultarTransInvalidasNoMySQL();
  
      if (Array.isArray(dataTransError)) {
        if (dataTransError.length === 0) {
          return res.status(404).json({ error: 'Nenhuma transação encontrada' });
        }
  
        return dataTransError;
      } else {
        return res.status(500).json({ error: 'Erro ao obter transações com falha' });
      }
    } catch (error) {
      console.error(`Erro no controllerTrans.getTransError`, error);
      return res.status(500).json({ error: 'Erro ao obter transações com falha' });
    }
};