import genderSlug from '../../utils/genderSlug';
import prisma from '../../utils/prisma';

class CategoryRepository {
    async create(name: string) {
        return await prisma.category.create({
            data: {
                name,
                slug: await genderSlug(name)
            }
        });
    }

    async getAll() {
        return await prisma.category.findMany({
            orderBy: [
                {
                    name: 'desc'
                }
            ]
        });
    }

    async getByName(name: string) {
        return await prisma.category.findUnique({ where: { name } });
    }

    async getById(id: number) {
        return await prisma.category.findUnique({ where: { id } });
    }

    async update(id: number, name: string) {
        return await prisma.category.update({
            where: { id },
            data: {
                name,
                slug: await genderSlug(name)
            }
        });
    }

    async deleteById(id: number) {
        return await prisma.category.delete({ where: { id } });
    }
}

export default new CategoryRepository();
