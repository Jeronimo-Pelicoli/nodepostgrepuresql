import { Pool } from 'pg';

/*elephantsql.com*/
const connectionString = '';

const db = new Pool({ connectionString });

export default db;