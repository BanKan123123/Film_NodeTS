import { Router } from 'express';
import CategoryController from '../controller/api/Category.api';

class CategoryRouter {
    router = Router();
    controller = new CategoryController();

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.post('/', this.controller.create);

        this.router.get('/', this.controller.findAll);

        this.router.get('/:id', this.controller.findOne);

        this.router.put('/:id', this.controller.update);

        this.router.delete('/id', this.controller.delete);
    }
}

export default new CategoryRouter().router;
