import { Request, Response } from 'express';
import { Transacao, LineData } from '../interfaces/index'
import * as selectTrans from '../models/selectTrans';
import * as selectTransError from '../models/selectTransError';
import * as insertTrans from '../models/insertTrans'
import * as insertTransErros from '../models/insertTransErrors'
import * as storeBalance from '../models/storeBalance';
import * as validate from '../utils/validate'

  
  // Organizar os dados em objetos com base no esquema de campos
  export const organizeData = (lines: string[], getField: (line: string, start: number, end: number) => string): LineData[] => {
    const data: LineData[] = [];
    const dataError: LineData[] = [];
  
    lines.forEach((line) => {
      const rawDate = getField(line, 2, 9); // Formato 'YYYYMMDD'
      const rawCPF = getField(line, 20, 30);
      // Formatado para: 'YYYY-MM-DD'
      const formattedDate = `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`;
      const validateDate = validate.isValidDate(formattedDate);
      const validateCPF = validate.isValidCPF(rawCPF);
  
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
        'Nome_da_loja': getField(line, 57, 74),
      };
  
      if (validateDate && validateCPF) {
        data.push(lineData);
      } else {
        dataError.push(lineData);
      }
    });

    insertTrans.inserirDadosValidosNoMySQL(data);
    insertTransErros.inserirDadosInvalidosNoMySQL(dataError);
  
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