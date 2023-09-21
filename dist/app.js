"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(routes_1.default);
app.listen(port, '0.0.0.0', () => {
    console.log(`API está rodando em http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map