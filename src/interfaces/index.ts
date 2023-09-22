
export interface Transacao {
    Tipo: string;
    Data: string;
    Valor: string;
    CPF: string;
    Cartao: string;
    'Dono da loja': string;
    'Nome_da_loja': string;
  }
  
export interface LineData extends Omit<Transacao, 'Valor'>{
    Valor: number;
  }

export  interface LojaTotal {
    nomeLoja: string;
    transacoes: Transacao[];
    SaldoEmConta: number;
}