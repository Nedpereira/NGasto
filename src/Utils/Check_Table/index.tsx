import db from "../../db";


const checkTableExists = async (tableName: any, callback: any) => {
  const database:any = await db;
  database.transaction((tx:any) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name=?;",
      [tableName],
      (tx:any, results:any) => {
        if (results.rows.length > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
      (tx:any, error:any) => {
        console.error('Erro ao verificar a existência da tabela:', error);
        callback(false);
      },
    );
  });
};

export {checkTableExists};

//---------------------Exemplo-------------------------
// checkTableExists('nome_tabela', (exists: any) => {
//   if (exists) {
//     console.log('A tabela nome_tabela existe!');
//   } else {
//     console.log('A tabela nome_tabela não existe.');
//   }
// });