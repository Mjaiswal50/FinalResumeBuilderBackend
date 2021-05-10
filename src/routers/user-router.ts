import {Router} from "express";
import {UserController} from "../controller/user-controller";
import {auth} from "../middleware/middlewares";

class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/signup', UserController.signUp);
        this.router.get('/login',UserController.login);
        this.router.get('/initialize',UserController.InitializeApp);//d3
        this.router.get('/verify/:code',UserController.verify);
        this.router.get('/fetch',auth,UserController.getUserDetails);
        this.router.patch('/update/profile',auth,UserController.updateProfile);
        this.router.patch('/update/name',auth,UserController.updateName);
        this.router.patch('/update/password',auth,UserController.updatePassword);
        this.router.patch('/update/onboarding',auth,UserController.updateOnboarding);//d4
        this.router.get('/reset/password/email',UserController.sendResetPasswordMail);
        this.router.patch('/reset/password',UserController.resetPassword);
        this.router.post('/codesetonmail',UserController.codeSetOnMail);
        this.router.patch('/setverified', UserController.setVerified);    }
}

export default new UserRouter().router;
