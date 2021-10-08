import { Request, Response, Router } from "express";
import UserRepository from "../repositories/user.repository";

const userRoutes = Router();

userRoutes.get("/user", async(req: Request, res: Response) => {
    try {
        const users = await UserRepository.findAllUsers();

        return res.json(users);
    } catch(error) {
        console.log(error);
    }
});

userRoutes.get("/user/byname/:name", async(req: Request, res: Response) => {
    try {
        const { name } = req.params;

        const users = await UserRepository.findByName(name);

        return res.json(users);
    } catch(error) {
        console.log(error);
    }
});

userRoutes.get("/user/byid/:uuid", async(req: Request, res: Response) => {
    try {
        const { uuid } = req.params;

        const users = await UserRepository.findById(uuid);

        return res.json(users);
    } catch(error) {
        console.log(error)
    }
});

userRoutes.post("/user", async(req: Request, res: Response) => {
    try {
        const newuser = req.body;

        const users = await UserRepository.createUser(newuser);

        return res.json(users);
    }catch(error) {
        console.log(error);
    }
})
userRoutes.put("/user", async(req: Request, res: Response) => {
    try {
        const newuser = req.body;
        const users = await UserRepository.updateUser(newuser);

        return res.json(users);
    } catch(error) {
        console.log(error)
    }
})
userRoutes.delete("/user/:uuid", async(req: Request, res: Response) => {
    try {
        const { uuid } = req.params;
        await UserRepository.deleteUser(uuid);
        return res.sendStatus(200);
    } catch(error) {
        console.log(error)
    }
})

export { userRoutes }