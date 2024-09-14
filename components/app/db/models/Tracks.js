const DB_NAME = "tracks";

// const FIELD_TINY_ID = "tinyId";
// const FIELD_NAME = "name";
// const FIELD_SIZE = "size";
// const FIELD_PATH = "path";
// const FIELD_USER_TOKEN = "userToken";
// const FIELD_DATE = "date";
// const FIELD_STORAGE_TIME = "storageTime";

// const INDEX_TINY_ID = "tinyIdIndex";
// const INDEX_USER_TOKEN = "userTokenIndex";
// const INDEX_DATE = "dateIndex";

export default class Tracks {
	constructor(db) {
		this.db = db;
	}

	drop() {
		this.db.exec(`DROP TABLE ${DB_NAME};`);
	}

	initialize() {
		// database.exec(`
		// 	CREATE TABLE IF NOT EXISTS ${DB_NAME} (
		// 		${FIELD_TINY_ID} TEXT PRIMARY KEY,
		// 		${FIELD_NAME} TEXT,
		// 		${FIELD_SIZE} INTEGER,
		// 		${FIELD_PATH} TEXT,
		// 		${FIELD_USER_TOKEN} TEXT,
		// 		${FIELD_DATE} INTEGER,
		// 		${FIELD_STORAGE_TIME} INTEGER
		// 	) STRICT;

		// 	CREATE INDEX IF NOT EXISTS ${INDEX_TINY_ID} ON ${DB_NAME} (${FIELD_TINY_ID});
		// 	CREATE INDEX IF NOT EXISTS ${INDEX_USER_TOKEN} ON ${DB_NAME} (${FIELD_USER_TOKEN});
		// 	CREATE INDEX IF NOT EXISTS ${INDEX_DATE} ON ${DB_NAME} (${FIELD_DATE});
		// `);
	}

	static debugPrintAllRecords() {
		// console.log(JSON.stringify(database.prepare(`SELECT * FROM ${DB_NAME}`).all(), null, 2));
	}

	// static createRecord({ tinyId, name, size, path, userToken, date, storageTime }) {
	// 	database
	// 		.prepare(`INSERT INTO ${DB_NAME} (${FIELD_TINY_ID}, ${FIELD_NAME}, ${FIELD_SIZE}, ${FIELD_PATH}, ${FIELD_USER_TOKEN}, ${FIELD_DATE}, ${FIELD_STORAGE_TIME}) VALUES (?, ?, ?, ?, ?, ?, ?)`)
	// 		.run(tinyId, name, size, path, userToken, date, storageTime);
	// }

	// static deleteRecordByTinyId(tinyId) {
	// 	database
	// 		.prepare(`DELETE FROM ${DB_NAME} WHERE ${FIELD_TINY_ID} = (?)`)
	// 		.run(tinyId);
	// }

	// static findRecords() {
	// 	return database
	// 		.prepare(`SELECT * FROM ${DB_NAME}`)
	// 		.all();
	// }

	// static findRecordByTinyId(tinyId) {
	// 	return database
	// 		.prepare(`SELECT * FROM ${DB_NAME} WHERE ${FIELD_TINY_ID} = (?)`)
	// 		.get(tinyId);
	// }

	// static findRecordWithTinyIdAndNameAndSizeByTinyId(tinyId) {
	// 	return database
	// 		.prepare(`SELECT ${FIELD_TINY_ID}, ${FIELD_NAME}, ${FIELD_SIZE} FROM ${DB_NAME} WHERE ${FIELD_TINY_ID} = (?)`)
	// 		.get(tinyId);
	// }

	// static findRecordsWithTinyIdAndNameAndSizeByUserToken(userToken) {
	// 	return database
	// 		.prepare(`SELECT ${FIELD_TINY_ID}, ${FIELD_NAME}, ${FIELD_SIZE} FROM ${DB_NAME} WHERE ${FIELD_USER_TOKEN} = (?)`)
	// 		.all(userToken);
	// }

	// static findRecordByTinyIdAndUserToken(tinyId, userToken) {
	// 	return database
	// 		.prepare(`SELECT * FROM ${DB_NAME} WHERE ${FIELD_TINY_ID} = (?) AND ${FIELD_USER_TOKEN} = (?)`)
	// 		.get(tinyId, userToken);
	// }
}
