import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string
}

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers['authorization'];
        if(!authorization) {
            throw new Error("authorization invalid");
        }

        const [ authenticationType, token ] = authorization.split(' ');

        if(authenticationType !== 'Bearer' || !token) {
            throw new Error("authorization invalid");
        }

        const { sub } = verify(token, 'my_secret_key') as IPayload

        req.user_id = sub;

        return next();
    } catch(error) {
        console.log(error)
    }
}

export { jwtMiddleware }
