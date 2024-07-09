import genderSlug from '../../utils/genderSlug';
import prisma from '../../utils/prisma';
import { CreateFilmInput, updateFilmSchema } from '../interface/model.interface';
import { random } from 'lodash';

class FilmRepositories {
    async getAll() {
        return await prisma.film.findMany({
            orderBy: [
                {
                    title: 'asc'
                }
            ],
            include: {
                director: true,
                categoriesOnFilm: {
                    include: {
                        category: true
                    }
                },
                comments: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }

    async getAllSuggest() {
        return await prisma.suggestFilms.findMany({
            orderBy: [
                {
                    id: 'asc'
                }
            ],
            include: {
                film: true
            }
        });
    }

    async getById(id: number) {
        return await prisma.film.findUnique({
            where: { id },
            include: {
                director: true,
                categoriesOnFilm: {
                    include: {
                        category: true
                    }
                },
                comments: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }

    async create(inputCreateFilm: CreateFilmInput) {
        const view = random(1000, 100000);
        const { title, description, directorId, categories, comments, status, rate, dateReleased, showTime, national, imageThumbnail, trailer } = inputCreateFilm;
        return await prisma.$transaction(async (prisma: any) => {
            //create film

            const film = await prisma.film.create({
                data: {
                    title,
                    slug: await genderSlug(title),
                    description,
                    directorId,
                    status,
                    rate,
                    view,
                    dateReleased,
                    showTime,
                    national,
                    imageThumbnail: "/uploads/image/" + imageThumbnail,
                    trailer: "/uploads/video/" + trailer,
                    categoriesOnFilm: {
                        create: categories.map((category) => ({
                            category: {
                                connect: { id: category.id }
                            }
                        }))
                    }
                }
            });

            const filmId = film.id;

            if (typeof comments !== 'undefined' && comments !== null) {
                await prisma.comment.createMany({
                    data: comments.map((comment) => ({
                        title: comment.title,
                        userId: comment.userId,
                        filmId: filmId
                    }))
                });
            }

            return prisma.film.findUnique({
                where: { id: filmId },
                include: {
                    director: true,
                    categoriesOnFilm: {
                        include: {
                            category: true
                        }
                    },
                    comments: {
                        include: {
                            user: true
                        }
                    }
                }
            });
        });
    }

    async update(id: number, inputUpdateFilm: updateFilmSchema) {
        const view = random(1000, 100000);

        return await prisma.$transaction(async (prisma: any) => {
            const updatedFilm = await prisma.film.update({
                where: { id },
                data: {
                    ...inputUpdateFilm,
                    view,
                    imageThumbnail: "/uploads/image/" + inputUpdateFilm.imageThumbnail,
                    trailer: "/uploads/video/" + inputUpdateFilm.trailer,
                    categoriesOnFilm: inputUpdateFilm.categories
                        ? {
                            set: inputUpdateFilm.categories.map((category) => ({
                                categoryId: category.id
                            }))
                        }
                        : undefined,
                    comments: undefined
                },

                include: {
                    director: true,
                    categoriesOnFilm: {
                        include: {
                            category: true
                        }
                    },
                    comments: {
                        include: {
                            user: true
                        }
                    }
                }
            });

            if (inputUpdateFilm.comments) {
                // First, delete existing comments for this film
                await prisma.comment.deleteMany({
                    where: { filmId: updatedFilm.id }
                });

                // Then, create new comments
                await prisma.comment.createMany({
                    data: inputUpdateFilm.comments.map((comment) => ({
                        title: comment.title,
                        userId: comment.userId,
                        filmId: updatedFilm.id
                    }))
                });
            }

            return prisma.film.findUnique({
                where: { id: updatedFilm.id },
                include: {
                    director: true,
                    categoriesOnFilm: {
                        include: {
                            category: true
                        }
                    },
                    comments: {
                        include: {
                            user: true
                        }
                    }
                }
            });
        });
    }

    async delete(id: number) {
        if (id) {
            await prisma.categoriesOnFilms.deleteMany({ where: { filmId: id } });
            await prisma.comment.deleteMany({ where: { filmId: id } });
        }

        return await prisma.film.delete({ where: { id } });
    }

    async suggestFilm(filmId: number) {
        return await prisma.suggestFilms.create({
            data: {
                filmId
            }
        });
    }
}

export default new FilmRepositories();
