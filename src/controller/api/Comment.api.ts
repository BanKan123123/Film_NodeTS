import { Request, Response } from 'express';
import CommentRepositories from '../../data/repositories/comment.repositories';
import HttpStatusCode from '../../utils/HttpStatusCode';

export default class CommentController {
    async findAll(req: Request, res: Response) {
        try {
            const comments = await CommentRepositories.getAll();
            res.json(comments);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { title, userId, filmId } = req.body;
            if (!title) throw new Error('Param title not found');
            const comment = await CommentRepositories.create(title, userId, filmId);
            res.json(comment);
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
            const comment = await CommentRepositories.getById(Number.parseInt(id));

            if (typeof comment === 'undefined') {
                res.status(HttpStatusCode.NOT_FOUND).send({
                    status: HttpStatusCode.NOT_FOUND,
                    message: 'Comment was not found'
                });
            }
            res.status(HttpStatusCode.OK).send({
                status: HttpStatusCode.OK,
                message: 'Get comment success',
                data: comment
            });
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
            const { title } = req.body;
            if (!title) throw new Error('Param title not found');
            const comment = await CommentRepositories.update(Number.parseInt(id), title);
            res.json(comment);
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
            const comment = await CommentRepositories.delete(Number.parseInt(id));
            res.json(comment);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }
}
