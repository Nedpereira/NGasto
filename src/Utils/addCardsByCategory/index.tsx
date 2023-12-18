import db from "../../db";

type AddCardsByCategoryProps = {
  totalGastos: number;
  totalLucros: number;
};

export const addCardsByCategory = async (mesAno: string): Promise<AddCardsByCategoryProps> => {
  const database = await db;

  const gastosTags = ['Casa', 'Lazer', 'Saúde', 'Educação', 'Transporte', 'Alimentação', 'Outros'];
  const lucrosTags = ['Salario', 'Beneficio', 'Freelance'];

  const somarValores = async (tags: string[]): Promise<number> => {
    return new Promise((resolve, reject) => {
        const tagsFormatadas = tags.map(tag => `'${tag}'`).join(', ');
        const sql = `SELECT SUM(CAST(valor AS FLOAT)) AS total FROM cards WHERE tag IN (${tagsFormatadas}) AND mes_ano = ?`;

        database.transaction(tx => {
            tx.executeSql(sql, [mesAno], (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0).total || 0);
          } else {
            resolve(0);
          }
        }, (error) => {
          reject(error);
        });
      });
    });
  };

  try {
    const totalGastos = await somarValores(gastosTags);
    const totalLucros = await somarValores(lucrosTags);
    return { totalGastos, totalLucros };
  } catch {
    return { totalGastos: 0, totalLucros: 0 };
  }
};
