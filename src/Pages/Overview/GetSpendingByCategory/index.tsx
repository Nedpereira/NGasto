import db from "../../../db";


const getGastosByCategory = async (mesAno: string) => {
    const database = await db;
    const categorias = ['Casa', 'Lazer', 'Saúde', 'Educação', 'Transporte', 'Alimentação', 'Outros'];

    const gastosPorCategoria = await Promise.all(
        categorias.map(async (categoria) => {
            const sql = `SELECT SUM(CAST(valor AS FLOAT)) AS total FROM cards WHERE tag = ? AND mes_ano = ?`;
            return new Promise((resolve, reject) => {
                database.transaction(tx => {
                    tx.executeSql(sql, [categoria, mesAno], (tx, results) => {
                        if (results.rows.length > 0) {
                            resolve({
                                categoria,
                                total: results.rows.item(0).total || 0
                            });
                        } else {
                            resolve({ categoria, total: 0 });
                        }
                    }, (error) => {
                        reject(error);
                    });
                });
            });
        })
    );

    return gastosPorCategoria.filter((gasto:any) => gasto.total > 0);
};

export default getGastosByCategory;
