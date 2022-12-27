import { Request, Response, Router } from "express";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken';

const loginRoutes = Router();

// “iss” O domínio da aplicação geradora do token
// “sub” É o assunto do token, mas é muito utilizado para guarda o ID do usuário
// “aud” Define quem pode usar o token
// “exp” Data para expiração do token
// “nbf” Define uma data para qual o token não pode ser aceito antes dela
// “iat” Data de criação do token
// “jti” O id do token

loginRoutes.post("/login", async (req: Request, res: Response) => {
    try {

        const { username, password } = req.body;

        const user = await userRepository.findByUsernameAndPassword(username, password);

        if(!user) {
            throw new Error("authorization invalid");
        }

        const jwtPayload = { username: user.username};
        const jwtOptions = { subject: user.uuid, expiresIn: "5m"};
        const secretKey = 'my_secret_key';

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)

        return res.json({ token: jwt });
    } catch(error) {
        console.log(error);
    }
});

export { loginRoutes }
