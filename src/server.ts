import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { loginRoutes } from './routes/loginRoutes';
import { responsehttp } from './routes/responsehttp';
import { jwtMiddleware } from './middlewares/jwtMiddleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(loginRoutes);
app.use(responsehttp);
app.use(jwtMiddleware);
app.use(userRoutes);

app.listen(3000, () => console.log("server is run"))
