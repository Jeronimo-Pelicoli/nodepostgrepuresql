import { Request, Response, Router } from "express";

const responsehttp = Router();

responsehttp.get("/responsehttp", async(req: Request, res: Response) => {

    return res.json({ header: req.rawHeaders, body: req.body});

});

responsehttp.post("/responsehttp", async(req: Request, res: Response) => {

    return res.json({ header: req.rawHeaders, body: req.body});

});

export { responsehttp }
