import { Request, Response } from 'express';
import UsersRepositories from '../../data/repositories/users.repositories';
import HttpStatusCode from '../../utils/HttpStatusCode';
import 'dotenv/config'
import jwt from 'jsonwebtoken';

export default class UsersController {
    async findAll(req: Request, res: Response) {
        try {
            const users = await UsersRepositories.getAll();
            res.json(users);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { username, password, email } = req.body;
            const user = await UsersRepositories.register(username, password, email);
            res.json(user);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const key = process.env.JWT_SECRET;
            const { username, password } = req.body;
            const user = await UsersRepositories.login(username, password);
            if (user === null) {
                res.status(HttpStatusCode.NOT_FOUND).send({
                    status: HttpStatusCode.NOT_FOUND,
                    message: `User ${username} was not exists in the database`
                });
            } else if (user === false) {
                res.status(HttpStatusCode.CONFLICT).send({
                    status: HttpStatusCode.CONFLICT,
                    message: 'Password incorrect'
                });
            } else {
                const token = jwt.sign({ username: username }, key || "", { expiresIn: '1h' });
                res.status(HttpStatusCode.OK).send({
                    status: HttpStatusCode.OK,
                    message: 'Login Successfully',
                    data: user,
                    token: token
                });
            }
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { username } = req.params;
            const { password, email } = req.body;

            const user = await UsersRepositories.update(username, password, email);
            res.json(user);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { username } = req.params;
            const user = await UsersRepositories.delete(username);
            res.json(user);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }
}
