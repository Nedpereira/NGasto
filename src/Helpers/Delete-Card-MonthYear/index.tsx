import db from "../../db";


export const DeleteCardsByMonthYear = async (monthYear: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const database = await db;
            database.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM cards WHERE mes_ano = ?',
                    [monthYear],
                    (_, result) => {
                        if (result.rowsAffected > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    },
                    (_, error) => {
                        reject(error);
                    }
                );
            });
        } catch (error) {
            console.error('Erro ao acessar o banco de dados:', error);
            reject(error);
        }
    });
};
