import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'database_sqlite.db', location: 'default' });

export default db;