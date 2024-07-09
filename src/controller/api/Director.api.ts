import { Request, Response } from 'express';
import DirectorRepositories from '../../data/repositories/director.repositories';
import HttpStatusCode from '../../utils/HttpStatusCode';

export default class DirectorController {
    async findAll(req: Request, res: Response) {
        try {
            const directors = await DirectorRepositories.getAll();
            res.json(directors);
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
            const director = await DirectorRepositories.getById(Number.parseInt(id));

            if (typeof director !== 'undefined') {
                res.status(HttpStatusCode.NOT_FOUND).send({
                    status: HttpStatusCode.NOT_FOUND,
                    message: 'Director was not found'
                });
            }

            res.status(HttpStatusCode.OK).send({
                status: HttpStatusCode.OK,
                message: 'Get director success',
                data: director
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
            const { name } = req.body;
            if (!name) throw new Error('Param was not found in request');

            const director = await DirectorRepositories.create(name);
            res.json(director);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            if (!name) throw new Error('Param was not found in request');

            const director = await DirectorRepositories.update(Number.parseInt(id), name);
            res.json(director);
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
            const director = await DirectorRepositories.delete(Number.parseInt(id));
            res.json(director);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }
}
