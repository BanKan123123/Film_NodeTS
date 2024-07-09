import { Router } from 'express';
import UsersController from '../controller/api/Users.api';
import { authMiddleWare } from '../middleware/auth.middleware';
import { Request, Response } from 'express';

class UsersRouter {
    router = Router();
    controller = new UsersController();
    userDecoded = authMiddleWare;

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.get('/', this.controller.findAll);

        this.router.get('/protected', authMiddleWare, (req: Request, res: Response) => {
            res.status(200).json({ message: 'This is a protected route ' + this.userDecoded });
        })

        this.router.post('/register', this.controller.register);

        this.router.post('/login', this.controller.login);

        this.router.put('/:username', this.controller.update);

        this.router.delete('/:username', this.controller.delete);
    }
}

export default new UsersRouter().router;
