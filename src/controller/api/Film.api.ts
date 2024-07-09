import { Request, Response } from 'express';
import FilmRepositories from '../../data/repositories/film.repositories';
import HttpStatusCode from '../../utils/HttpStatusCode';
import { createFilmSchema, updateFilmSchema } from '../../data/interface/model.interface';

export default class FilmController {
    async finAll(req: Request, res: Response) {
        try {
            const films = await FilmRepositories.getAll();
            res.json(films);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const film = await FilmRepositories.getById(Number.parseInt(id));
            if (typeof film === 'undefined') {
                res.status(HttpStatusCode.NOT_FOUND).send({
                    status: HttpStatusCode.NOT_FOUND,
                    message: 'Film was not found'
                });
            }
            res.status(HttpStatusCode.OK).send({
                status: HttpStatusCode.OK,
                message: 'Get film success',
                data: film
            });
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: err
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const inputCreateFilm = createFilmSchema.parse(req.body);
            const film = await FilmRepositories.create(inputCreateFilm);
            res.json(film);
        } catch (error) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: error
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const inputUpdateFilm = updateFilmSchema.parse(req.body);

            const film = await FilmRepositories.update(Number.parseInt(id), inputUpdateFilm);
            res.json(film);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: err
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const film = await FilmRepositories.delete(Number.parseInt(id));

            res.json(film);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: err
            });
        }
    }

    async findAllSuggest(req: Request, res: Response) {
        try {
            const filmsSuggest = await FilmRepositories.getAllSuggest();
            res.json(filmsSuggest);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: err
            });
        }
    }

    async suggestFilm(req: Request, res: Response) {
        try {
            const { filmId } = req.body;
            const suggestFilm = await FilmRepositories.suggestFilm(filmId);
            res.json(suggestFilm);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: err
            });
        }
    }
}
