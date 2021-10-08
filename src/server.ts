import express from 'express';
import { userRoutes } from './routes/userRoutes';
import { loginRoutes } from './routes/loginRoutes';
import { jwtMiddleware } from './middlewares/jwtMiddleware';

const app = express();

app.use(express.json());
app.use(loginRoutes);
app.use(jwtMiddleware);
app.use(userRoutes);

app.listen(3000, () => console.log("server is run"))