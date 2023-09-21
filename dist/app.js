"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`API está rodando em http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map