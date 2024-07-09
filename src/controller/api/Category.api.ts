import { Request, Response } from 'express';
import CategoryRepository from '../../data/repositories/category.repositories';
import HttpStatusCode from '../../utils/HttpStatusCode';
import { Category } from '@prisma/client';

export default class CategoryController {
    async findAll(req: Request, res: Response) {
        try {
            const categories = await CategoryRepository.getAll();
            res.json(categories);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            if (req.body) {
                if (Array.isArray(req.body) && req.body.length > 0) {
                    const promises = req.body.map((item: Category) => {
                        const { name } = item;
                        if (!name) throw new Error('Param name not found');
                        return CategoryRepository.create(name);
                    });
                    const categoriesCreated = await Promise.all(promises);
                    return res.json(categoriesCreated);
                } else if (typeof req.body === 'object' && req.body !== null) {
                    const { name } = req.body;
                    if (!name) throw new Error('Param name not found');
                    const category = CategoryRepository.create(name);
                    res.json(category);
                }
                throw new Error('Invalid request body');
            }
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: err
            });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await CategoryRepository.getById(Number.parseInt(id));

            if (typeof category === 'undefined') {
                res.status(HttpStatusCode.NOT_FOUND).send({
                    status: HttpStatusCode.NOT_FOUND,
                    message: 'Category was not found'
                });
            }

            res.status(HttpStatusCode.OK).send({
                status: HttpStatusCode.OK,
                message: 'Get category success',
                data: category
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
            const { name } = req.body;
            const category = await CategoryRepository.update(Number.parseInt(id), name);
            res.json(category);
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
            const category = await CategoryRepository.deleteById(Number.parseInt(id));
            res.json(category);
        } catch (err) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                status: HttpStatusCode.BAD_REQUEST,
                message: 'Something was error in Server'
            });
        }
    }
}
