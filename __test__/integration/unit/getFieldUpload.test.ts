import { getField } from '../../../src/models/getFieldUpload';

describe('getField', () => {
  it('deve retornar o tipo da transação', () => {
    const line = '3202301020000015100195514960781753****3153AFONSO PEREIRAADEGA PEREIRA';

    const result = getField(line, 1, 1);

    
    expect(result).toBe('3');
  });

  it('deve retornar a data da transação', () => {
    const line = '3202301020000015100195514960781753****3153AFONSO PEREIRAADEGA PEREIRA';

    const result = getField(line, 2, 9);

    // O campo esperado é '20230102' (ou outra data válida), conforme a descrição
    expect(result).toBe('20230102');
  });

  it('deve retornar o valor da movimentação normalizado', () => {
    const line = '3202301020000015100195514960781753****3153AFONSO PEREIRAADEGA PEREIRA';

    const result = getField(line, 10, 19);

    // O campo esperado é '0000015100' (ou outro valor válido normalizado), conforme a descrição
    expect(result).toBe('0000015100');
  });

  it('deve retornar o CPF do beneficiário', () => {
    const line = '3202301020000015100195514960781753****3153AFONSO PEREIRAADEGA PEREIRA';

    const result = getField(line, 20, 30);

    // O campo esperado é '19551496078' (ou outro CPF válido), conforme a descrição
    expect(result).toBe('19551496078');
  });

  it('deve retornar o cartão utilizado na transação', () => {
    const line = '3202301020000015100195514960781753****3153AFONSO PEREIRAADEGA PEREIRA';

    const result = getField(line, 31, 42);

    // O campo esperado é '1753****3153' (ou outro cartão válido), conforme a descrição
    expect(result).toBe('1753****3153');
  });

  it('deve retornar o nome do representante da loja', () => {
    const line = 'A202301020000015100195514960781753****3153AFONSO PEREIRAADEGA PEREIRA';

    const result = getField(line, 43, 56);

    // O campo esperado é 'AFONSO PEREIRA' (ou outro nome válido), conforme a descrição
    expect(result).toBe('AFONSO PEREIRA');
  });

  it('deve retornar o nome da loja', () => {
    const line = 'A202301020000015100195514960781753****3153AFONSO PEREIRAADEGA PEREIRA';

    const result = getField(line, 57, 74);

    // O campo esperado é 'ADEGA PEREIRA' (ou outro nome de loja válido), conforme a descrição
    expect(result).toBe('ADEGA PEREIRA');
  });
});
