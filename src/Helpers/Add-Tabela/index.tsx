import db from "../../db";


export const CreateCardsTable = async () => {
    const database = await db;

    database.transaction((tx:any) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS cards (' +
          'id INTEGER PRIMARY KEY,' +
          'mes_ano TEXT,' +
          'tag TEXT,' +
          'descricao TEXT,' +
          'valor TEXT)'
      );
    });
};