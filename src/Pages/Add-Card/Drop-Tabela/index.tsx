import db from "../../../db";

export const DropTabelaCards = async () => {
    const database = await db;

    database.transaction((tx:any) => {
      tx.executeSql('DROP TABLE IF EXISTS cards', [], (_:any, result:any) => {
        console.log('Tabela "cards" excluída com sucesso.');
      }, (_:any, error:any) => {
        console.error('Erro ao excluir a tabela "cards":', error);
      });
    });
};