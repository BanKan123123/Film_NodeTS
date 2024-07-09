import { Router } from 'express';
import EpisodeController from '../controller/api/Episode.api';

class EpisodeRouter {
    router = Router();
    controller = new EpisodeController();

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

export default new EpisodeRouter().router;
