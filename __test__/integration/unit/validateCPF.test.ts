import { isValidCPF } from '../../../src/utils/validate';

describe('isValidCPF', () => {
  it('deve retornar verdadeiro para um CPF válido', () => {
    const cpf = '123.456.789-09'; // Um CPF válido

    const result = isValidCPF(cpf);

    expect(result).toBe(true);
  });

  it('deve retornar falso para um CPF com todos os dígitos iguais', () => {
    const cpf = '111.111.111-11'; // CPF com todos os dígitos iguais

    const result = isValidCPF(cpf);

    expect(result).toBe(false);
  });

  it('deve retornar falso para um CPF com formato inválido', () => {
    const cpf = '123456789'; // CPF com formato inválido

    const result = isValidCPF(cpf);

    expect(result).toBe(false);
  });

  it('deve retornar falso para um CPF inválido', () => {
    const cpf = '425.042.778-04'; // Um CPF inválido 987.654.321-00

    const result = isValidCPF(cpf);

    expect(result).toBe(false);
  });
});
