import db from "../../../../db";

export const searchCardById = async (id: number, callback: (card: any) => void) => {
  try {
    const database = await db;
    database.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM cards WHERE id = ?;',
        [id],
        (_: any, results: any) => {
          const card = results.rows.length > 0 ? results.rows.item(0) : null;
          callback(card);
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
