import { getClient } from "./utils";

async function updateTodoByUserId(id: number) {
    const client = await getClient();

    const updateTodoQuery = `UPDATE todos SET done = $1 WHERE id = $2`;
    await client.query(updateTodoQuery, [true, id]);

    console.log(`todo with id: ${id} is updated!`)   

}
updateTodoByUserId(1);