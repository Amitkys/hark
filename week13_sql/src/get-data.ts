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

async function getUserFromEmail(email: string) {
    const client = await getClient();
    
    const selectUserText = 'SELECT * FROM users WHERE email = $1';
    const userRes = await client.query(selectUserText, [email]);

    console.log('single user details (by email): ');

    for (let user of userRes.rows) {
        console.log(`ID ${user.id}, EMAIL: ${user.email}`);
    }

}

async function getTodoByUserId(id:number) {
    const client = await getClient();

    const selectUserText = 'SELECT * FROM todos WHERE userId = $1';
    const userRes = await client.query(selectUserText, [id]);

    console.log('getting Todos by user id');

    for(let todo of userRes.rows){
        console.log(`Title: ${todo.title}, Description: ${todo.description}, Status: ${todo.done}`);
    }
}

getTodoByUserId(1);


// getUserData();
// getUserFromEmail('amit@gmail.com');