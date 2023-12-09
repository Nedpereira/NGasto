import db from "../../db";

interface Card {
  mesAno: string;
}

export const searchAllCards = async (mesAno:Card, callback: (cards: Card[]) => void): Promise<void> => {
  try {
    const database = await db;
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM cards WHERE mes_ano = ?;',
        [mesAno],
        (_, results) => {
          let cards = [];
          for (let i = 0; i < results.rows.length; i++) {
            cards.push(results.rows.item(i));
          }
          callback(cards);
        },
        (tx, error) => {
          console.error('Erro ao buscar dados na tabela "cards":', error);
        }
      );
    });
  } catch (error) {
    console.error('Erro na consulta da tabela "cards":', error);
  }
};
