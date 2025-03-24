import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

console.log('Database URL:', process.env.DATABASE_URL); // Debug log

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;