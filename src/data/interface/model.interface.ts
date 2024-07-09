import { z } from 'zod';

const dateSchema = z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
        return new Date(arg);
    }
    return arg;
}, z.date().optional());

export const createFilmSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    directorId: z.number().int().positive('Director ID must be a positive integer'),
    categories: z
        .array(
            z.object({
                id: z.number().int().positive('Category ID must be a positive integer')
            })
        )
        .min(1, 'At least one category is required'),
    comments: z
        .array(
            z.object({
                title: z.string().min(1, 'Comment title is required'),
                userId: z.number().int().positive('User ID must be a positive integer')
            })
        )
        .optional(),
    status: z.enum(['CONTINUE', 'FULL']),
    rate: z.number().min(0, 'Rate must be at least 0').max(10, 'Rate must be at most 10'),
    dateReleased: dateSchema,
    showTime: dateSchema,
    national: z.string().optional(),
    imageThumbnail: z.string(),
    trailer: z.string()
});
export type CreateFilmInput = z.infer<typeof createFilmSchema>;

export const updateFilmSchema = z
    .object({
        title: z.string().min(1, 'Title is required').optional(),
        description: z.string().min(1, 'Description is required').optional(),
        directorId: z.number().int().positive('Director ID must be a positive integer').optional(),
        categories: z
            .array(
                z.object({
                    id: z.number().int().positive('Category ID must be a positive integer')
                })
            )
            .optional(),
        comments: z
            .array(
                z.object({
                    title: z.string().min(1, 'Comment title is required'),
                    userId: z.number().int().positive('User ID must be a positive integer')
                })
            )
            .optional(),
        status: z.enum(['CONTINUE', 'FULL']).optional(),
        rate: z.number().min(0, 'Rate must be at least 0').max(10, 'Rate must be at most 10').optional(),
        dateReleased: dateSchema,
        showTime: dateSchema,
        national: z.string().optional(),
        imageThumbnail: z.string(),
        trailer: z.string()
    })
    .partial();

export type updateFilmSchema = z.infer<typeof updateFilmSchema>;

export interface Category {
    id: Number;
    name: String;
    slug: String;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: Number;
    title: String;
    User: Users;
    createdAt: Date;
    updatedAt: Date;
}

export interface Users {
    id: Number;
    username: String;
    password: String;
    email?: String;
    createdAt?: Date;
    updatedAt?: Date;
    comments: Comment[];
}

export interface Director {
    id: Number;
    name: String;
    slug: String;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Film {
    title: string;
    description: string;
    directorId: number;
    categories: { id: number }[];
    comments?: { title: string; userId: number }[];
    status: 'CONTINUE' | 'FULL';
    rate: number;
    dateReleased?: Date;
    showTime?: Date;
    national?: string;
    imageThumbnail?: string;
    trailer?: string;
}

export interface SuggestFilm {
    id: Number;
    film: Film;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CompletedFilm {
    id: Number;
    film: Film;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Episode {
    id: number;
    title: string;
    slug?: string;
    audioUrl?: string;
    episodeIndex: number;
    filmId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
