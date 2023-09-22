import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET: string | undefined = process.env.SECRET;

export const login = (req: any, res: any) => {
    try {
        // Simulador de DB
        const resUsuarioBDSimulator = {
            email: 'vini@email.com',
            password: '$2b$10$y4XgedrrY5qlhD3BD3Lrsuv/lqcV2bRnpzJjQciOTzSru5DOcpqFC', // senha = 12345 hashada
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
        const validacaoPassword = bcrypt.compareSync(req.body.password,resUsuarioBDSimulator.password);

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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};

export const verificarToken = (req: any, res: any, next: any) => {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: 'Token inválido.',
        });
    }
};
