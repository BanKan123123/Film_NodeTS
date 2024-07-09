import { comparePassword, cryptPassword } from '../../utils/cryptPassword';
import prisma from '../../utils/prisma';

class UsesRepositories {
    async getAll() {
        return await prisma.users.findMany({
            orderBy: [
                {
                    id: 'desc'
                }
            ]
        });
    }

    async register(username: string, password: string, email: string) {
        const hashPassword = await this.cryptPasswordAsync(password);
        return await prisma.users.create({
            data: {
                user_name: username,
                password: hashPassword,
                email
            }
        });
    }

    async login(username: string, password: string) {
        const user = await prisma.users.findUnique({
            where: {
                user_name: username
            }
        });
        if (!user) {
            return user;
        } else {
            if (user.password !== null) {
                return await this.comparePasswordAsync(password, user.password);
            }
        }
    }

    async update(username: string, password: string, email: string) {
        return await prisma.users.update({
            where: { user_name: username },
            data: {
                password: await this.cryptPasswordAsync(password),
                email
            }
        });
    }

    async delete(username: string) {
        return await prisma.users.delete({
            where: { user_name: username }
        });
    }

    async cryptPasswordAsync(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cryptPassword(password, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            });
        });
    }

    async comparePasswordAsync(plainPass: string, hashword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            comparePassword(plainPass, hashword, (err, isPasswordMatch) => {
                if (err) reject(err);
                else resolve(isPasswordMatch);
            });
        });
    }
}

export default new UsesRepositories();
