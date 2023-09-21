import * as express from 'express'

const app = express();
const port = 3000;

app.listen(port, '0.0.0.0', () => {
    console.log(`API está rodando em http://localhost:${port}`)
});