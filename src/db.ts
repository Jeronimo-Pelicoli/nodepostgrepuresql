import { Pool } from 'pg';

/*elephantsql.com*/
const connectionString = 'postgres://esmzllgh:Lhf9if-Pvu3wd4_VDa2RfQMEQLfCSXg7@motty.db.elephantsql.com/esmzllgh';

const db = new Pool({ connectionString });

export default db;
