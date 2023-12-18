import db from "../../db";

export const inserirCard = async (mes_ano: string, tag: string, descricao: string, valor: string) => {
  try {
    const database = await db;
    database.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO cards (mes_ano, tag, descricao, valor) VALUES (?, ?, ?, ?);',
        [mes_ano, tag, descricao, valor],
        (_: any, result: any) => {
          console.log('Card inserido com sucesso:', result);
        },
        (tx: any, error: any) => {
          console.log('Erro ao inserir card:', error);
        }
      );
    });
  } catch (error) {
    console.log('Erro ao inserir card na tabela:', error);
  }
};
