import { Client } from "pg";

export async function getClient() {
    // console.log('in get clint function')
    const client = new Client({
        connectionString: "postgresql://postgres.xniejvpknerpsdetpgaw:amitkys%40890@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
    });

    try {
        await client.connect();
        console.log('connected to db');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }

    return client;
}
// getClient();
