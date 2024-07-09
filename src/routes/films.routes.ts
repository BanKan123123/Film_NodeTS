import { Router } from 'express';
import FilmController from '../controller/api/Film.api';

class FilmRouter {
    router = Router();
    controller = new FilmController();

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.post('/', this.controller.create);

        this.router.get('/', this.controller.finAll);

        this.router.post('/suggest', this.controller.suggestFilm);

        this.router.get('/suggest', this.controller.findAllSuggest);

        this.router.get('/:id', this.controller.findOne);

        this.router.put('/update/:id', this.controller.update);

        this.router.delete('/delete/:id', this.controller.delete);
    }
}

export default new FilmRouter().router;
