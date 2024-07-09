import { Router } from 'express';
import DirectorController from '../controller/api/Director.api';

class DirectorRouter {
    router = Router();
    controller = new DirectorController();

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.post('/', this.controller.create);

        this.router.get('/', this.controller.findAll);

        this.router.get('/:id', this.controller.findOne);

        this.router.put('/:id', this.controller.update);

        this.router.delete(':id', this.controller.delete);
    }
}

export default new DirectorRouter().router;
