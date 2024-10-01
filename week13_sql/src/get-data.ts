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

async function 


// getUserData();
getUserFromEmail('amit@gmail.com');