import db from "../../db";

export const buscarTodosOsCards = async (callback: (cards: any[]) => void) => {
  try {
    const database = await db;
    database.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM cards;',
        [],
        (_: any, results: any) => {
          let cards = [];
          for (let i = 0; i < results.rows.length; i++) {
            cards.push(results.rows.item(i));
          }
          callback(cards);
        },
        (tx: any, error: any) => {
          console.error('Erro ao buscar dados na tabela "cards":', error);
        }
      );
    });
  } catch (error) {
    console.error('Erro na consulta da tabela "cards":', error);
  }
};
