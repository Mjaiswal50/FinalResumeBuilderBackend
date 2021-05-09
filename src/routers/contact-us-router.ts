import {Request, Response, Router} from "express";
import {Nodemailer} from "../nodemailer";

class ContactUsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('', this.sendEmail);
    }

    sendEmail( req: Request, res: Response) {
        if (!req.body.name || !req.body.email || !req.body.message) {
            res.status(422).json({
                message: 'please provide a valid name, email and message ',
                status_code: 422
            })
        } else {
            const html = `<h3>You have recieved new query</h3> 
<h2>Full name :  ${req.body.name}</h2>
<h2>email :  ${req.body.email}</h2>
<h2>message :  ${req.body.message}</h2>`;
            Nodemailer.sendEmail('jaiswalmayank450@gmail.com', 'jaiswalmayank450@gmail.com'
                , 'recieved new query', html).then(()=>{
                    res.status(200).json({
                        message:'Email sent Successfully'
                    })
             })
        }
    }
}

export default new ContactUsRouter().router;
//name email