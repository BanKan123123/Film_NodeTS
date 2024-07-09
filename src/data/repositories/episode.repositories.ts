import genderSlug from '../../utils/genderSlug';
import prisma from '../../utils/prisma';

class EpisodeRepositories {
    async getAll() {
        return await prisma.episode.findMany({
            orderBy: [
                {
                    title: 'asc'
                }
            ],
            include: {
                film: true
            }
        });
    }

    async getById(id: number) {
        return await prisma.episode.findUnique({ where: { id }, include: { film: true } });
    }

    async create(title: string, filmId: number, episodeIndex: number, audioUrl?: string) {
        return await prisma.episode.create({
            data: {
                title,
                slug: await genderSlug(title),
                filmId,
                episodeIndex,
                audioUrl: audioUrl ? audioUrl : null
            }
        });
    }

    async update(id: number, title: string, filmId: number, episodeIndex: number) {
        return await prisma.episode.update({
            where: { id },
            data: {
                title,
                slug: await genderSlug(title),
                filmId,
                episodeIndex
            }
        });
    }

    async delete(id: number) {
        return await prisma.episode.delete({ where: { id } });
    }
}

export default new EpisodeRepositories();
