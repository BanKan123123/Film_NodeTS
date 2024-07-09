import { Request, Response } from 'express';
import EpisodeRepositories from '../../data/repositories/episode.repositories';
import HttpStatusCode from '../../utils/HttpStatusCode';

export default class EpisodeController {
    async findAll(req: Request, res: Response) {
        try {
            const episodes = await EpisodeRepositories.getAll();
            res.json(episodes);
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
            const episode = await EpisodeRepositories.getById(Number.parseInt(id));
            if (typeof episode === 'undefined') {
                res.status(HttpStatusCode.NOT_FOUND).send({
                    status: HttpStatusCode.NOT_FOUND,
                    message: 'Episode was not found'
                });
            }
            res.status(HttpStatusCode.OK).send({
                status: HttpStatusCode.OK,
                message: 'Get episode success',
                data: episode
            });
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, filmId, episodeIndex, audioUrl } = req.body;

            if (!title) throw new Error('Param title not found');
            const episode = await EpisodeRepositories.create(title, Number.parseInt(filmId), Number.parseInt(episodeIndex), audioUrl);

            res.json(episode);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: err
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, filmId, episodeIndex } = req.body;
            if (!name) throw new Error('Param name not found');
            const episode = await EpisodeRepositories.update(Number.parseInt(id), name, Number.parseInt(filmId), Number.parseInt(episodeIndex));
            res.json(episode);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const episode = await EpisodeRepositories.delete(Number.parseInt(id));
            res.json(episode);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }
}
