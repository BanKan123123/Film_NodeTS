import genderSlug from '../../utils/genderSlug';
import prisma from '../../utils/prisma';

class DirectorRepositories {
    async getAll() {
        return await prisma.director.findMany({
            orderBy: [
                {
                    name: 'asc'
                }
            ],
            include: {
                film: true
            }
        });
    }

    async getById(id: number) {
        return await prisma.director.findUnique({
            where: { id },
            include: {
                film: true
            }
        });
    }

    async getByName(name: string) {
        return await prisma.director.findUnique({
            where: { name },
            include: {
                film: true
            }
        });
    }

    async create(name: string) {
        return await prisma.director.create({
            data: {
                name,
                slug: await genderSlug(name)
            }
        });
    }

    async update(id: number, name: string) {
        return await prisma.director.update({
            where: { id },
            data: {
                name,
                slug: await genderSlug(name)
            }
        });
    }

    async delete(id: number) {
        return await prisma.director.delete({ where: { id } });
    }
}

export default new DirectorRepositories();
