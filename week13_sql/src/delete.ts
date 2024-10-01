import { getClient } from "./utils";

async function deleteTodosbyUserId(id: number) {
    const client = await getClient();
    const query:string = `DELETE FROM todos WHERE id = $1`;
    await client.query(query, [id]); 
    console.log(`todo with ${id} is deleted!`)
}
deleteTodosbyUserId(1);