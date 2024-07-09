import express, { Application, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import Routes from './routes/routes';
import multer from 'multer';
import bodyParser from 'body-parser';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/uploads/images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/uploads/videos'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const uploadVideo = multer({ storage: storageVideo });

const app: Application = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/routes')));

new Routes(app);

app.post('/api/upload/image', upload.single('image'), function (req, res) {
    try {
        res.status(200).send("Uploading image successfully");
    } catch (error) {
        res.status(500).send('Error uploading file.');
    }
});

app.post('/api/upload/video', uploadVideo.single('video'), function (req, res) {
    try {
        res.status(200).send('Video uploaded successfully.');
    } catch (error) {
        res.status(500).send('Error uploading video.');
    }
});

app.use('/uploads/image', express.static(path.join(__dirname, 'uploads/images')));
app.use('/uploads/video', express.static(path.join(__dirname, 'uploads/videos')));

app.use((req: Request, res: Response) => {
    res.status(404).send({
        status: 404,
        message: 'Error, Page was not found.'
    });
});

app.listen(4001, () => {
    console.log('Connecting Server....');
});
