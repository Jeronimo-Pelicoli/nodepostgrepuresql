import db from "../db";
import { User } from "../model/User";


class UserRepository {

    async findAllUsers(): Promise<User[]> {
        const query = `SELECT uuid, username FROM application_user`;
        const { rows } = await db.query<User>(query);

        return rows;
    }

    async findByName(name: string): Promise<User> {
        const query = `SELECT uuid, username FROM application_user WHERE username= $1`;
        const values = [name];
        const result = await db.query<User>(query, values);
        const { rows } = result;
        const [ user ] = rows;
        return user;
    }

    async findById(uuid: string): Promise<User> {
        const query = `SELECT uuid, username FROM application_user WHERE uuid= $1`;
        const values = [uuid];
        const result = await db.query<User>(query, values);
        const { rows } = result;
        const [ user ] = rows;
        console.log(user)
        return user;
    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User> {
        const query = `SELECT uuid, username FROM application_user WHERE username = $1 AND password = crypt($2, 'my_salt')`;
        const values = [ username, password ];

        const { rows } = await db.query<User>(query, values);

        const [ user ] = rows;

        return user;
    }

    async createUser(user: User): Promise<User> {
        const query = `INSERT INTO application_user (username, password) VALUES ($1, crypt($2, 'my_salt')) RETURNING uuid, username`;
        const values = [user.username, user.password];
        const { rows } = await db.query<User>(query, values);
        const [ newuser ] = rows;
        return newuser;
    }

    async updateUser(user: User): Promise<User> {
        const query = `UPDATE application_user SET username = $1, password = crypt($2, 'my_salt') WHERE uuid = $3 RETURNING uuid, username`;
        const values = [ user.username, user.password, user.uuid];
        const { rows } = await db.query<User>(query, values);
        console.log(rows)
        const [ newuser ] = rows;
        return newuser;
    }

    async deleteUser(uuid: string): Promise<void> {
        const query = `DELETE FROM application_user WHERE uuid = $1`;
        const values = [uuid];
        await db.query(query, values);
    }
}

export default new UserRepository();