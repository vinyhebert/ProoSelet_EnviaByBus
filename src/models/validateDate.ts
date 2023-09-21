export const isValidDate = (dateString: string): boolean => {

    /**
     * Validações
     * - Verifica se a data está no formato "YYYY-MM-DD"
     * - Verifica se a data é válida
     *      - Verifica se o ano, mês e dia estão dentro dos limites válidos
     *      - Verifica meses com 30 dias
     *      - Verifica mês de fevereiro e anos bissextos
     */

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }


    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);


    if (year < 1000 || year > 9999 || month === 0 || month > 12 || day === 0 || day > 31) {
        return false;
    }


    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
        return false;
    }


    if (month === 2) {
        if (day > 29) {
            return false;
        }
        if (day === 29 && !(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
            return false;
        }
    }

    return true;
};
