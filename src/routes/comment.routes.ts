import { Router } from 'express';
import CommentController from '../controller/api/Comment.api';

class CommentRouter {
    router = Router();
    controller = new CommentController();

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.post('/', this.controller.create);
        this.router.get('/', this.controller.findAll);

        this.router.get('/:id', this.controller.findOne);

        this.router.put('/:id', this.controller.update);
        this.router.delete('/:id', this.controller.delete);
    }
}

export default new CommentRouter().router;
