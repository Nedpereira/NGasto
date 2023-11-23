import db from "../../db";

export const inserirCard = async (tag: string, descricao: string, valor: string) => {
  try {
    const database = await db;
    database.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO cards (tag, descricao, valor) VALUES (?, ?, ?);',
        [tag, descricao, valor],
        (_: any, result: any) => {
          console.log('Card inserido com sucesso:', result);
        },
        (tx: any, error: any) => {
          console.error('Erro ao inserir card:', error);
        }
      );
    });
  } catch (error) {
    console.error('Erro ao inserir card na tabela:', error);
  }
};
