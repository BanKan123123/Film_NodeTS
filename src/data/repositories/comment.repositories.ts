import prisma from '../../utils/prisma';

class CommentRepositories {
    async create(title: string, userId: number, filmId: number) {
        return await prisma.comment.create({
            data: {
                title,
                userId,
                filmId
            }
        });
    }

    async getAll() {
        return await prisma.comment.findMany({
            orderBy: [
                {
                    title: 'asc'
                }
            ],
            include: {
                user: true,
                film: true
            }
        });
    }

    async getById(id: number) {
        return await prisma.comment.findUnique({
            where: { id },
            include: {
                user: true,
                film: true
            }
        });
    }

    async update(id: number, title: string) {
        return await prisma.comment.update({
            where: { id },
            data: {
                title
            }
        });
    }

    async delete(id: number) {
        return await prisma.comment.delete({ where: { id } });
    }
}

export default new CommentRepositories();
