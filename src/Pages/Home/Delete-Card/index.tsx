import db from '../../../db';

export const DeleteCard = async (id: number) => {
    const database = await db;

    database.transaction((tx: any) => {
        tx.executeSql(
            'DELETE FROM cards WHERE id = ?',
            [id],
            (_: any, result: any) => {
                console.log(`Card ID ${id} apagado com sucesso..`);
                return result;
            },
            (_: any, error: any) => {
                console.error(`Erro ao excluir card com ID ${id}:`, error);
            }
        );
    });
};
