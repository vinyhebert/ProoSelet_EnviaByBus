"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalizarValoresPorLoja = void 0;
const totalizarValoresPorLoja = (transacoes) => {
    // Crie um objeto para rastrear as totalizações por loja
    const totalizacoes = {};
    // Itere pelas transações e some os valores por loja
    transacoes.forEach((transacao) => {
        const nomeLoja = transacao["Nome_da_loja"];
        const valorString = transacao["Valor"];
        const valorNum = parseFloat(valorString);
        // Se a loja ainda não estiver no objeto de totalizações, crie-a
        if (!totalizacoes[nomeLoja]) {
            totalizacoes[nomeLoja] = {
                nomeLoja,
                transacoes: [],
                SaldoEmConta: 0,
            };
        }
        // Adicione a transação ao array de transações da loja
        totalizacoes[nomeLoja].transacoes.push(transacao);
        // Some o valor ao total da loja
        totalizacoes[nomeLoja].SaldoEmConta += valorNum;
    });
    // Crie um array de resultados com objetos contendo as transações e totalização de cada loja
    const resultados = [];
    for (const nomeLoja in totalizacoes) {
        resultados.push(totalizacoes[nomeLoja]);
    }
    return resultados;
};
exports.totalizarValoresPorLoja = totalizarValoresPorLoja;
//# sourceMappingURL=storeBalance.js.map