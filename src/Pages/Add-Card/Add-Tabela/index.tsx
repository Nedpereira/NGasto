import db from "../../../db";

export const CriarTabelaCards = async () => {
    const database = await db;

    database.transaction((tx:any) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS cards (' +
          'id INTEGER PRIMARY KEY,' +
          'tag TEXT,' +
          'descricao TEXT,' +
          'valor TEXT)'
      );
    });
};