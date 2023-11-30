const getSaudacao = (nome: string) => {
    const horaAtual = new Date().getHours();
    let saudacao;

    if (horaAtual >= 5 && horaAtual < 12) {
        saudacao = 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
        saudacao = 'Boa tarde';
    } else {
        saudacao = 'Boa noite';
    }

    return `${saudacao}, ${nome}`;
};

export default getSaudacao;
