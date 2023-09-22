import { isValidDate } from '../../../src/utils/validate';

describe('isValidDate', () => {
  it('deve retornar verdadeiro para uma data válida no formato "YYYY-MM-DD"', () => {
    const dateString = '2023-09-19';

    const result = isValidDate(dateString);

    expect(result).toBe(true);
  });

  it('deve retornar falso para uma data com formato inválido', () => {
    const dateString = '19/09/2023';

    const result = isValidDate(dateString);

    expect(result).toBe(false);
  });

  it('deve retornar falso para uma data com ano inválido', () => {
    const dateString = '90905-09-19'; //9999-09-19

    const result = isValidDate(dateString);

    expect(result).toBe(false);
  });

  it('deve retornar falso para uma data com mês inválido', () => {
    const dateString = '2023-13-19';

    const result = isValidDate(dateString);

    expect(result).toBe(false);
  });

  it('deve retornar falso para uma data com dia inválido', () => {
    const dateString = '2023-09-32';

    const result = isValidDate(dateString);

    expect(result).toBe(false);
  });

  it('deve retornar falso para uma data com fevereiro e ano não bissexto', () => {
    const dateString = '2023-02-29';

    const result = isValidDate(dateString);

    expect(result).toBe(false);
  });

  it('deve retornar verdadeiro para uma data com fevereiro e ano bissexto', () => {
    const dateString = '2024-02-29';

    const result = isValidDate(dateString);

    expect(result).toBe(true);
  });
});
