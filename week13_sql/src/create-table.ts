import { getClient } from "./utils";

async function createTable() {
    const client = await getClient();
    const createUserTableQuery: string = `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `;

    await client.query(createUserTableQuery);

    const createTodosQuery: string =  `
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            userId INTEGER REFERENCES users(id),
            done BOOLEAN DEFAULT FALSE
        );
    `;

    await client.query(createTodosQuery);

    console.log('table created successfully');
}
createTable();