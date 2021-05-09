import * as  express from 'express';
import * as mongoose from "mongoose";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import UserRouter from './routers/user-router';
import ContactUsRouter from './routers/contact-us-router';
import ResumeRouter from './routers/resume-router';
import {environment} from "./environments/environment.dev";
import {join} from "path";
import {Request, Response} from "express";


export class Server {
    corsOptions: cors.CorsOptions = {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: '*',
        preflightContinue: false
    };
    public app: express.Application;
    // DIST_FOLDER = join(process.cwd(), 'dist');
    // APP_NAME = 'resume-builder';

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI: string = environment.db_url;
        mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        mongoose.connection.on('connected', function () { console.log("connected to database"); });
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use('*', cors(this.corsOptions));
    }
    routes() {
        // cal these routes which are commented our to run angular on server side only.
        // paste angular code in a dist folder only
        // const router: express.Router = express.Router();
        // this.app.get('*.*', express.static(join(this.DIST_FOLDER, this.APP_NAME)));
        // // this.app.get('/', (req: Request, res: Response) => {
        // //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'home.html'));
        // // });
        // this.app.get('/get-started/', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'get-started.html'));
        // });
        // this.app.get('/get-started/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'get-started.html'));
        // });
        // this.app.get('/login/', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'login.html'));
        // });
        // this.app.get('/login/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'login.html'));
        // });
        // this.app.get('/about-us', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'about-us.html'));
        // });
        // this.app.get('/about-us/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'about-us.html'));
        // });
        // this.app.get('/contact-us', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'contact-us.html'));
        // });
        // this.app.get('/password/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        // this.app.get('/logout', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        // this.app.get('/contact-us/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'contact-us.html'));
        // });
        // this.app.get('/user/*', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        // this.app.get('/user/', (req: Request, res: Response) => {
        //     res.sendFile(join(this.DIST_FOLDER, this.APP_NAME, 'index.html'));
        // });
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter);
        this.app.use('/api/contact', ContactUsRouter);
        this.app.use('/api/resume', ResumeRouter);
        this.app.use(this.logErrors);
        this.app.use(this.errorHandle);
    }

    errorHandle(error, req, res, next) {
        {
            res.status(error.status || 5000);
            res.json({
                error: error.message
            })
        }
    }

    logErrors(req, res, next) {
        let error: any;
        error = new Error('Not Found');
        error.status = 404;
        next(error)
    }
}

export default new Server().app;
