import { getClient } from "./utils";

async function getUserData() {
    const client = await getClient();
    const getUserQuery = "SELECT * FROM users";
    const userRes = await client.query(getUserQuery);
    console.log('all users');
    for(let user of userRes.rows) {
        console.log(`ID: ${user.id}, EMAIL: ${user.email}`);

    }
}
getUserData();