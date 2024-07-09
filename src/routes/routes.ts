import { Application } from 'express';
import categoryRoutes from './category.routes';
import usersRoutes from './users.routes';
import commentRoutes from './comment.routes';
import directorRoutes from './director.routes';
import episodeRoutes from './episode.routes';
import filmsRoutes from './films.routes';

export default class Routes {
    constructor(app: Application) {
        app.use('/api/v1/category', categoryRoutes);
        app.use('/api/v1/users', usersRoutes);
        app.use('/api/v1/comments', commentRoutes);
        app.use('/api/v1/director', directorRoutes);
        app.use('/api/v1/episode', episodeRoutes);
        app.use('/api/v1/films', filmsRoutes);
    }
}
