import { Request, Response, Router } from 'express';
import * as getFieldUpload from './models/getFieldUpload';
import * as transactionController from './controllers/transactionController';
import * as authControllers from './controllers/authController';

import { memoryStorage }  from 'multer';
import multer = require('multer');

const router = Router();

// Configuração do multer para lidar com o upload de arquivos
const storage = memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', authControllers.verificarToken, upload.single('file'), (req: Request, res: Response) => {
    try {
        const fileBuffer = req.file.buffer.toString();
        const lines = fileBuffer.split('\n');
        
        const getField = getFieldUpload.getField;
        const data = transactionController.organizeData(lines, getField);
    
        res.json({res: data});
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar o arquivo.');
      }
})

// Transações + Saldo da loja
router.post('/transByCompany', authControllers.verificarToken, async (req: Request, res: Response) => {
    try {
      const transacoes = await transactionController.getTrans(req, res);
      res.json(transacoes);
    } catch (error) {
      console.error('Erro ao obter as transações:', error);
      res.status(500).json({ error: 'Erro ao obter as transações' });
    }
  });
  
  // Transações que deram errado
router.post('/transWithError', authControllers.verificarToken, async (req: Request, res: Response) => {
    try {
      const transacoesComFalha = await transactionController.getTransError(req, res);
      res.json({transacoesComFalha});
    } catch (error) {
      console.error('Erro ao obter as transações com falha:', error);
      res.status(500).json({ error: 'Erro ao obter as transações com falha' });
    }
  });

router.post("/login", authControllers.login);

export default router;