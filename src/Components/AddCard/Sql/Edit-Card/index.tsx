import db from "../../../../db";

export const editCard = async (id: number, tag: string, descricao: string, valor: string, callback: (isSuccess: boolean) => void) => {
    try {
      const database = await db;
      database.transaction((tx: any) => {
        tx.executeSql(
          'UPDATE cards SET tag = ?, descricao = ?, valor = ? WHERE id = ?;',
          [tag, descricao, valor, id],
          (_: any, resultSet: any) => {
            if (resultSet.rowsAffected > 0) {
              callback(true);
            } else {
              callback(false);
            }
          },
          (tx: any, error: any) => {
            callback(false);
          }
        );
      });
    } catch (error) {
      callback(false);
    }
  };
  