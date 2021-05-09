import User from "../models/user";
const bcrypt = require('bcryptjs');
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import {Request, Response} from "express";
import {EmailVerificationHtml, Nodemailer, PasswordResetHtml} from "../nodemailer";
import { getMaxListeners } from "process";

var randomstring = require("randomstring");

export class UserController {

    static signUp(req: Request, res: Response) {
        if (!req.body.email && !req.body.password) {
            res.status(422).json({
                message: 'Please provide all details',
                status_code: 422
            })
        } else if (!req.body.email) {
            res.status(422).json({
                message: 'Please provide an email',
                status_code: 422
            })
        } else if (!req.body.password || !req.body.confirm_password) {
            res.status(422).json({
                message: 'Please provide a password and confirm password',
                status_code: 422
            })
        } else if (req.body.password !== req.body.confirm_password) {
            res.status(422).json({
                message: 'Password and confirm password does not match',
                status_code: 422
            })
        } else if (!req.body.name) {
            res.status(422).json({
                message: 'Please provide your full name',
                status_code: 422
            })
        } else if (!req.body.job_category) {
            res.status(422).json({
                message: 'Please provide your job Category',
                status_code: 422
            })
        } else if (!req.body.experience_level) {
            res.status(422).json({
                message: 'Please provide your Experience Level',
                status_code: 422
            })
        } else {
            User.find({email: req.body.email})
                .exec()
                .then(user => {
                    if (user.length >= 1) {
                        return res.status(409).json({
                            message: "Mail already exists",
                            status_code: 409
                        });
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).send(err)
                            } else {
                                const user = new User({
                                    email: req.body.email,
                                    password: hash,
                                    name: req.body.name,
                                    experience_level: req.body.experience_level,
                                    job_category: req.body.job_category,
                                    code: randomstring.generate()
                                });
                                user
                                    .save()
                                    .then(data => {
                                        const uri = (data as any).code;
                                        const html = EmailVerificationHtml(uri);
                                        return Nodemailer.sendEmail('jaiswalmayank450@gmail.com', req.body.email,
                                            'email verification', html).then(() => {
                                            return res.status(201).send(data)
                                        })
                                    })
                                    .catch(err => {
                                        return res.status(500).send(err)
                                    });
                            }
                        });
                    }
                });
        }

    };

    static verify(req: Request, res: Response) {
        const code = req.params.code;
        User.findOneAndUpdate({code: code}, {verified: true}).exec().then((user) => {
            if (user) {
                res.redirect('https://www.digiresumes.com')
            } else {
                res.send('email not verified. please try by clicking send email again');
            }
        }).catch((err) => {
            res.status(500).send(err);
        })
    }

    static getUserDetails(req: Request, res: Response) {
        const date = moment().format('LLLL');
        const userId = (req as any).userData.userID;
        User.findOneAndUpdate({_id: userId}, {last_active: date}, {new: true})
            .select('onboarding verified _id email password name code last_active experience_level job_category')
            .then(data => {
                res.status(200).send(data);
            }).catch((err) => {
            res.status(500).send(err);
        })
    }

    static login(req: Request, res: Response) {
        const email = req.query.email;
        const password = req.query.password;
        if (!email || !password) {
            res.status(422).json({
                message: 'please provide an email and password',
                status_code: 422
            })
        }
        User.find({email: email}).select('onboarding verified _id email password name code last_active experience_level job_category')
            .exec().then((user) => {
            if (user.length < 1) {
                return res.status(422).json({
                    message: "Email Does not exist",
                    status_code: 422
                });
            }
            let User = (user[0] as any);
            bcrypt.compare(password, User.password, (err, result) => {
                if (err) {
                    return res.status(422).json({
                        message: "Email and password does not match",
                        status_code: 422
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: User.email,
                        userID: User._id
                    }, 'secret', {
                        expiresIn: '10days'
                    });
                    return res.status(200).json({
                        token: token,
                        user: User
                    })
                } else {
                    return res.status(422).json({
                        message: "Email and password does not match",
                        status_code: 422
                    });
                }
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
    }


    static sendEmailVerification(req: Request, res: Response) {
        const code : any = req.query.code;
        const email = req.query.email;
        if (!code) {
            res.status(500).json({
                message: 'Please send a valid code',
                status_code: 500
            })
        }
        if (!email) {
            res.status(500).json({
                message: 'Please send a email',
                status_code: 500
            })
        } else {
            const html = EmailVerificationHtml(code);
            return Nodemailer.sendEmail('jaiswalmayank450@gmail.com', email, 'email verification', html)
                .then((data) => {
                    return res.status(201).send(data)
                }).catch(err => {
                    return res.status(500).send(err)
                });

        }
    }

    static updatePassword(req: Request, res: Response) {
        const oldPassword = req.body.old_password;
        let newPassword = req.body.new_password;
        const confirmPassword = req.body.confirm_password;
        const userId = (req as any).userData.userID;
        if (!oldPassword || !newPassword || !confirmPassword) {
            res.status(422).json({
                message: "Please provide old,new and confirm password",
                status_code: 422
            })
        } else if (newPassword !== confirmPassword) {
            res.status(422).json({
                message: "new password and confirm password does'nt match",
                status_code: 422
            })
        } else {
            User.findOne({_id: userId}).then((response) => {
                bcrypt.compare(oldPassword, (response as any).password, (err, data) => {
                    console.log(err, data);
                    if (err) {
                        return res.status(500).send(err)
                    } else if (data) {
                        bcrypt.hash(newPassword, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).send(err)
                            } else {
                                newPassword = hash;
                                return User.findOneAndUpdate({_id: userId}, {password: newPassword}, {new: true})
                                    .exec().then((data) => {
                                        return res.status(200).send(data);
                                    }).catch(err => {
                                        return res.status(500).send(err)
                                    });
                            }
                        })
                    } else {
                        return res.status(422).json({
                            message: "old password does'nt match",
                            status_code: 422
                        })
                    }
                })
            }).catch((err) => {
                return res.status(500).send(err)
            })

        }
    }

    static updateProfile(req: Request, res: Response) {
        const name = req.body.name;
        const job_category = req.body.job_category;
        const experience_level = req.body.experience_level;
        const userId = (req as any).userData.userID;
        if (!name) {
            res.status(422).json({
                message: "Please provide your name",
                status_code: 422
            });
        } else if (!experience_level) {
            res.status(422).json({
                message: "Please provide your Experience Level",
                status_code: 422
            });
        } else if (!job_category) {
            res.status(422).json({
                message: "Please provide your Job Category",
                status_code: 422
            });
        } else {
            const data = {
                name: name,
                job_category: job_category,
                experience_level: experience_level
            };
            User.findOneAndUpdate({_id: userId}, data, {new: true}).exec().then((data) => {
                res.status(200).send(data);
            }).catch(err => {
                res.status(500).send(err)
            });
        }
    }

    static updateOnboarding(req: Request, res: Response) {
        const onboarding = req.body.onboarding;
        const userId = (req as any).userData.userID;
        if (!onboarding) {
            res.status(422).json({
                message: "Please provide value of onboarding",
                status_code: 422
            });
        } else {
            User.findOneAndUpdate({_id: userId}, {onboarding: onboarding}, {new: true}).exec().then((data) => {
                res.status(200).send(data);
            }).catch(err => {
                res.status(500).send(err)
            });
        }
    }

    static updateName(req: Request, res: Response) {
        const name = req.body.name;
        const userId = (req as any).userData.userID;
        if (!name) {
            res.status(422).json({
                message: "Please provide your name",
                status_code: 422
            });
        } else {
            User.findOneAndUpdate({_id: userId}, {name: name}, {new: true}).exec().then((data) => {
                res.status(200).send(data);
            }).catch(err => {
                res.status(500).send(err)
            });
        }
    }

    static sendResetPasswordMail(req: Request, res: Response) {
        const email = req.query.email;
        if (!email) {
            res.status(422).json({
                message: 'Please send an email',
                status_code: 422
            });
        } else {
            User.findOne({email: email}).then((data) => {
                let code = (data as any).code;
                const html = PasswordResetHtml(code);
                Nodemailer.sendEmail('jaiswalmayank450@gmail.com', email, 'Password Reset Email', html).then(() => {
                    res.status(200).json({
                        message: 'A password email has been sent to you',
                        status_code: 200
                    });
                })
            })
        }
    }

    static resetPassword(req: Request, res: Response) {
        const code = req.body.code;
        let new_password = req.body.new_password;
        const confirm_password = req.body.confirm_password;
        if (!code || !new_password || !confirm_password) {
            res.status(422).json({
                message: 'Please send a valid code , password and confirm password',
                status_code: 422
            });
        } else if (confirm_password !== new_password) {
            res.status(422).json({
                message: "new password and confirm password does'nt match",
                status_code: 422
            });
        } else {
            bcrypt.hash(new_password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send(err)
                } else {
                    new_password = hash;
                    return User.findOneAndUpdate({code: code}, {password: new_password}, {new: true})
                        .exec().then((data) => {
                            return res.status(200).send(data);
                        }).catch(err => {
                            return res.status(500).send(err)
                        });
                }
            })
        }
    }

    static InitializeApp(req: Request, res: Response) {
        res.status(200).json({
            message: 'App initialized successfully',
            status_code: 200
        })
    }

    static codeSetOnMail(req: Request, res: Response){
        const email = req.body.mail;
        const otptoken = Nodemailer.otpgenerator();
        let html = `${otptoken}`;
        Nodemailer.sendEmail('jaiswalmayank450@gmail.com', email , 'Password Reset Email', html).then(
         () => {
                User.findOneAndUpdate({ email: email }, { code: otptoken }, { new: true }).then((user) => {
               if (user) {

               } else {
                   res.send('user not exist');
               }
           }).catch((err) => {
               res.status(500).send(err);
           })
                
            }
            )
    }

    static setVerified(req: Request, res: Response) {
        let token = req.body.OtpVerify;
        User.findOneAndUpdate({ code: token }, { verified: true }, { new: true }).exec().then((data) => {
            if (data) {
            return res.status(201).send(data);
            } else {
                res.send('user not exist');
            }
        }).catch((err) => {
            res.status(500).send(err);
        })
    }
        
}
