import db from "../../../db";

export const CriarTabelaCards = async () => {
    const database = await db;

    database.transaction((tx:any) => {
      // tx.executeSql('DROP TABLE IF EXISTS cards', [], (_:any, result:any) => {
      //   console.log('Tabela "cards" excluída com sucesso.');
      // }, (_:any, error:any) => {
      //   console.error('Erro ao excluir a tabela "cards":', error);
      // });
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS cards (' +
          'id INTEGER PRIMARY KEY,' +
          'tag TEXT,' +
          'descricao TEXT,' +
          'valor TEXT)'
      );
    });
};