import * as express from 'express'
import router from './routes'
import * as bodyParser from 'body-parser'

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(router);

app.listen(port, '0.0.0.0', () => {
    console.log(`API está rodando em http://localhost:${port}`)
});