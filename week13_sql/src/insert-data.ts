import { getClient } from "./utils";

async function createEntries() {
    const client = await getClient();
    const insertUserText: string = `
        INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id;
    `;
    const userValues = ['kys@gmail.com', 'hashed_pass_here'];

    let response = await client.query(insertUserText, userValues);

    const insertTodoText: string = `
        INSERT INTO todos (title, description, userId, done) VALUES ($1, $2, $3, $4) RETURNING id;
    `;
    const todoValues = ['gym', 'going to gym', response.rows[0].id, false];
    await client.query(insertTodoText, todoValues);


    console.log('Entries created!');   
}
createEntries();