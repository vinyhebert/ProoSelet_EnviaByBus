import { Request, Response, Router } from 'express';

const router = Router();

router.post('/upload', (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar o arquivo.');
    }
})

export default router;