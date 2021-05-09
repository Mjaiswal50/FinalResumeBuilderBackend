import {Request, Response} from "express";
import Resume from "../models/resumes/resume";
import Education, {default as education} from "../models/resumes/education";
import EmploymentHistory from "../models/resumes/employment-history";
import Language from "../models/resumes/languages";
import Skill, {default as skills} from "../models/resumes/skills";
import Refrence from "../models/resumes/refrences";
import ContactDetail from "../models/resumes/contact-details";
import AwardAchivements from "../models/resumes/awards-achivements";
import Interest from "../models/resumes/interests";
import IndustrialExposure from "../models/resumes/industrial-exposure";
import ProjectDetails from "../models/resumes/project-details";
import Strength from "../models/resumes/strength";
import Weakness from "../models/resumes/weakness";
import Objective from "../models/resumes/objectives";
import * as aws from 'aws-sdk'
import {Promise} from "mongoose";
import * as pdf from "html-pdf";

export class ResumeController {

    static addContactDetails(req: Request, res: Response) {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const zip_code = req.body.zip_code;
        const country = req.body.country;
        const resume_id = req.params.id;
        const summary = req.body.summary;
        const linkedin_url = req.body.linkedin_url;
        const website_url = req.body.website_url;

        const contact_details = new ContactDetail({
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email,
            address: address,
            city: city,
            state: state,
            zip_code: zip_code,
            country: country,
            summary: summary,
            linkedin_url: linkedin_url,
            website_url: website_url
        });
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        Resume.findOneAndUpdate({_id: resume_id}, {contact_details: contact_details}, {new: true}).then(() => {
            contact_details.save().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                res.status(500).send(err)
            })
        })
    }

    static addEducation(req: Request, res: Response) {
        const resume_id = req.params.id;
        const school_name = req.body.school_name;
        const city = req.body.city;
        const state = req.body.state;
        const field = req.body.field;
        const degree_type = req.body.degree_type;
        const graduation_month = req.body.graduation_month;
        const graduation_year = req.body.graduation_year;
        const percentage = req.body.percentage;

        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const education = new Education({
            school_name: school_name,
            city: city,
            state: state,
            field: field,
            degree_type: degree_type,
            graduation_month: graduation_month,
            graduation_year: graduation_year,
            percentage: percentage,
        });
        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).education.push(education);
            Promise.all([education.save(), data.save()]).then((data) => {
                res.status(200).send(education)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addResume(req: Request, res: Response) {
        const userId = (req as any).userData.userID;
        const name = req.body.name;
        const resume = new Resume({
            user_id: userId,
            name: name,
        });
        resume.save().then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addEmploymentHistory(req: Request, res: Response) {
        const resume_id = req.params.id;
        const employer = req.body.employer;
        const job_title = req.body.designation;
        const city = req.body.city;
        const state = req.body.state;
        const organisation = req.body.organisation;
        const start_month = req.body.start_month;
        const start_year = req.body.start_year;
        const end_month = req.body.end_month ? req.body.end_month : null;
        const end_year = req.body.end_year ? req.body.end_year : null;

        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const emplymentHistory = new EmploymentHistory({
            resume_id: resume_id,
            employer: employer,
            designation: job_title,
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year
        });

        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).employment_history.push(emplymentHistory);
            Promise.all([emplymentHistory.save(), data.save()]).then((data) => {
                res.status(200).send(emplymentHistory)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addLanguages(req: Request, res: Response) {
        const name = req.body.name;
        const level = req.body.level;
        const resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const language = new Language({
            name: name,
            level: level,
        });
        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).languages.push(language);
            Promise.all([language.save(), data.save()]).then((data) => {
                res.status(200).send(language)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addSkills(req: Request, res: Response) {
        const skill = req.body.skill;
        const level = req.body.level;
        const resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const newSkill = new Skill({
            skill: skill,
            level: level,
        });
        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).skills.push(newSkill);
            Promise.all([newSkill.save(), data.save()]).then((data) => {
                res.status(200).send(newSkill)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addRefrences(req: Request, res: Response) {
        const name = req.body.name;
        const relationship = req.body.relationship;
        const company = req.body.company;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const refrence = new Refrence({
            name: name,
            relationship: relationship,
            company: company,
            email: email,
            phone: phone,
            address: address,
        });

        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).refrences.push(refrence);
            Promise.all([refrence.save(), data.save()]).then((data) => {
                res.status(200).send(refrence)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addAwardsAndAchivements(req: Request, res: Response) {
        const awards_and_achivements = req.body.awards_and_achivements;
        const resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const award_achivements = new AwardAchivements({
            awards_and_achivements: awards_and_achivements
        });

        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).award_achivements.push(award_achivements);
            Promise.all([award_achivements.save(), data.save()]).then((data) => {
                res.status(200).send(award_achivements)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addInterest(req: Request, res: Response) {
        const interest = req.body.interest;
        const resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }

        const newInterest = new Interest({
            interest: interest
        });
        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).interests.push(newInterest);
            Promise.all([newInterest.save(), data.save()]).then((data) => {
                res.status(200).send(newInterest)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addIndustrialExposure(req: Request, res: Response) {
        const resume_id = req.params.id;
        const organisation = req.body.organisation;
        const city = req.body.city;
        const state = req.body.state;
        const start_month = req.body.start_month;
        const start_year = req.body.start_year;
        const end_month = req.body.end_month;
        const end_year = req.body.end_year;
        const work = req.body.work;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }

        const industrialExposure = new IndustrialExposure({
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year,
            work: work,
        });

        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).industrialExposures.push(industrialExposure);
            Promise.all([industrialExposure.save(), data.save()]).then((data) => {
                res.status(200).send(industrialExposure)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addProjectDetails(req: Request, res: Response) {
        const resume_id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const duration = req.body.duration;
        const role = req.body.role;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const projectDetail = new ProjectDetails({
            title: title,
            description: description,
            duration: duration,
            role: role,
        });

        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).projectDetails.push(projectDetail);
            Promise.all([projectDetail.save(), data.save()]).then((data) => {
                res.status(200).send(projectDetail)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addStrength(req: Request, res: Response) {
        const resume_id = req.params.id;
        const name = req.body.name;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const strength = new Strength({
            name: name
        });
        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).strengths.push(strength);
            Promise.all([strength.save(), data.save()]).then((data) => {
                res.status(200).send(strength)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addWeakness(req: Request, res: Response) {
        const resume_id = req.params.id;
        const name = req.body.name;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        const weakness = new Weakness({
            name: name
        });
        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).weakness.push(weakness);
            Promise.all([weakness.save(), data.save()]).then((data) => {
                res.status(200).send(weakness)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static addObjectives(req: Request, res: Response) {
        const resume_id = req.params.id;
        const objective = req.body.objective;
        const date = req.body.date;
        const place = req.body.place;
        const declaration = req.body.declaration;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }

        const newOjective = new Objective({
            objective: objective,
            date: date,
            place: place,
            declaration: declaration,
        });

        Resume.findOne({_id: resume_id}).then((data) => {
            (data as any).objectives.push(newOjective);
            Promise.all([newOjective.save(), data.save()]).then((data) => {
                res.status(200).send(newOjective)
            }).catch(err => {
                res.status(500).send(err)
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static renderPDF(req: Request, res: Response) {
        const html = req.body.html;
        if (!html) {
            res.status(422).json({
                message: 'please provide html to proceed',
                status_code: 422
            })
        }
        const border = {
            "top": "24px",
            "right": "24px",
            "bottom": "24px",
            "left": "24px"
        };
        pdf.create(html, {border: border, format: 'A4'}).toBuffer(((err, buffer) => {
            res.send(buffer);
        }))
    }

    static addImage(req: Request, res: Response) {
        const resumeId = req.params.id;
        // const image_url = (req.file as any).path;
        // const path = image_url ? 'http://localhost:5000/' + image_url : null
        const image_name = (req.file as any).originalname;
        const path = image_name ? 'http://localhost:5000/' + 'src/uploads/' + image_name : null;

        if (!resumeId) {
            res.status(422).json({
                message: 'please provide a contact detail id',
                status_code: 422
            })
        }
        if (!path) {
            res.status(422).json({
                message: 'please upload an image to proceed',
                status_code: 422
            })
        }
        Resume.findOneAndUpdate({_id: resumeId}, {image_url: path}, {new: true}).populate(`education skills languages refrences contact_details employment_history 
        award_achivements interests industrialExposures projectDetails strengths weakness objectives`)
            .then((data) => {
                res.status(200).send(data)
            }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }


    static getAllResume(req: Request, res: Response) {
        const userId = (req as any).userData.userID;
        Resume.find({user_id: userId}).populate(`education skills languages refrences contact_details employment_history 
        award_achivements interests industrialExposures projectDetails strengths weakness objectives `).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static getResume(req: Request, res: Response) {
        const resume_id = req.params.id;
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        Resume.findOne({_id: resume_id}).populate(`education skills languages refrences contact_details employment_history 
        award_achivements interests industrialExposures projectDetails strengths weakness objectives`).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateResume(req: Request, res: Response) {
        const resume_id = req.params.id;
        const name = req.body.name;
        const data = {
            name: name
        };
        if (!name) {
            res.status(422).json({
                message: 'please provide a name',
                status_code: 422
            })
        }
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        Resume.findOneAndUpdate({_id: resume_id}, data, {new: true}).populate(`education skills languages refrences contact_details employment_history 
        award_achivements interests industrialExposures projectDetails strengths weakness objectives`)
            .then((data) => {
                res.status(200).send(data)
            }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateResumeViews(req: Request, res: Response) {
        const views = req.body.views;
        const resume_id = req.params.id;
        if (!views) {
            res.status(422).json({
                message: 'please provide views',
                status_code: 422
            })
        }
        if (!resume_id) {
            res.status(422).json({
                message: 'please provide a resume id',
                status_code: 422
            })
        }
        ;
        Resume.findOneAndUpdate({_id: resume_id}, {views: views}, {new: true}).populate(`education skills languages refrences contact_details employment_history 
        award_achivements interests industrialExposures projectDetails strengths weakness objectives`)
            .then((data) => {
                res.status(200).send(data)
            }).catch(err => {
            res.status(500).send(err)
        })
    }


    static updateContactDetails(req: Request, res: Response) {
        const contact_detail_id = req.params.id;
        const first_name = req.body.first_name;
        const phone_number = req.body.phone_number;
        const email = req.body.email;
        const address = req.body.address;
        const state = req.body.state;
        const city = req.body.city;
        const zip_code = req.body.zip_code;
        const country = req.body.country;
        const summary = req.body.summary;
        const last_name = req.body.last_name;
        const linkedin_url = req.body.linkedin_url;
        const website_url = req.body.website_url;
        const data = {
            first_name: first_name,
            phone_number: phone_number,
            email: email,
            address: address,
            state: state,
            city: city,
            zip_code: zip_code,
            country: country,
            summary: summary,
            last_name: last_name,
            linkedin_url: linkedin_url,
            website_url: website_url
        };
        ContactDetail.findOneAndUpdate({_id: contact_detail_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateEducation(req: Request, res: Response) {
        const education_id = req.params.id;
        const school_name = req.body.school_name;
        const city = req.body.city;
        const state = req.body.state;
        const field = req.body.field;
        const degree_type = req.body.degree_type;
        const graduation_month = req.body.graduation_month;
        const graduation_year = req.body.graduation_year;
        const percentage = req.body.percentage;
        const data = {
            school_name: school_name,
            city: city,
            state: state,
            field: field,
            degree_type: degree_type,
            graduation_year: graduation_year,
            graduation_month: graduation_month,
            percentage: percentage,
        };
        Education.findOneAndUpdate({_id: education_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateEmploymentHistory(req: Request, res: Response) {
        const employment_history_id = req.params.id;
        const employer = req.body.employer;
        const organisation = req.body.organisation;
        const job_title = req.body.designation;
        const city = req.body.city;
        const state = req.body.state;
        const start_month = req.body.start_month;
        const start_year = req.body.start_year;
        const end_month = req.body.end_month ? req.body.end_month : null;
        const end_year = req.body.end_year ? req.body.end_year : null;
        const data = {
            employer: employer,
            designation: job_title,
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year,
        };
        EmploymentHistory.findOneAndUpdate({_id: employment_history_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateLanguage(req: Request, res: Response) {
        const language_id = req.params.id;
        const name = req.body.name;
        const level = req.body.level;
        const data = {
            name: name,
            level: level,
        };
        Language.findOneAndUpdate({_id: language_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateSkill(req: Request, res: Response) {
        const skill_id = req.params.id;
        const skill = req.body.skill;
        const level = req.body.level;
        const data = {
            skill: skill,
            level: level,
        };
        Skill.findOneAndUpdate({_id: skill_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateRefrence(req: Request, res: Response) {
        const reference_id = req.params.id;
        const name = req.body.name;
        const relationship = req.body.relationship;
        const company = req.body.company;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const data = {
            name: name,
            relationship: relationship,
            company: company,
            email: email,
            phone: phone,
            address: address,
        };
        Refrence.findOneAndUpdate({_id: reference_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateAwardAchivements(req: Request, res: Response) {
        const award_achivement_id = req.params.id;
        const awards_and_achivements = req.body.awards_and_achivements;
        const data = {
            awards_and_achivements: awards_and_achivements
        };
        AwardAchivements.findOneAndUpdate({_id: award_achivement_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateInterest(req: Request, res: Response) {
        const interest_id = req.params.id;
        const interest = req.body.interest;
        const data = {
            interest: interest
        };
        Interest.findOneAndUpdate({_id: interest_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }


    static updateIndustrialExposure(req: Request, res: Response) {
        const industrial_exposure_id = req.params.id;
        const organisation = req.body.organisation;
        const city = req.body.city;
        const state = req.body.state;
        const start_month = req.body.start_month;
        const start_year = req.body.start_year;
        const end_month = req.body.end_month;
        const end_year = req.body.end_year;
        const work = req.body.work;

        const data = {
            organisation: organisation,
            city: city,
            state: state,
            start_month: start_month,
            start_year: start_year,
            end_month: end_month,
            end_year: end_year,
            work: work,
        };

        IndustrialExposure.findOneAndUpdate({_id: industrial_exposure_id}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateProjectDetails(req: Request, res: Response) {
        const projectDetailId = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
        const duration = req.body.duration;
        const role = req.body.role;
        const data = {
            title: title,
            description: description,
            duration: duration,
            role: role,
        };
        ProjectDetails.findOneAndUpdate({_id: projectDetailId}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateStrength(req: Request, res: Response) {
        const strengthId = req.params.id;
        const name = req.body.name;
        const data = {
            name: name
        };
        Strength.findOneAndUpdate({_id: strengthId}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateWeakness(req: Request, res: Response) {
        const weaknessId = req.params.id;
        const name = req.body.name;
        const data = {
            name: name
        };
        Weakness.findOneAndUpdate({_id: weaknessId}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static updateObjective(req: Request, res: Response) {
        const objectiveId = req.params.id;
        const objective = req.body.objective;
        const date = req.body.date;
        const place = req.body.place;
        const declaration = req.body.declaration;
        const data = {
            objective: objective,
            date: date,
            declaration: declaration,
            place: place,
        };
        Objective.findOneAndUpdate({_id: objectiveId}, data, {new: true}).then((data) => {
            res.status(200).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
    }

    static deleteResume(req: Request, res: Response) {
        const resume_id = req.params.id;
        Resume.findOne({_id: resume_id}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                res.status(500).send(err)
            })
        });
    }

    static deleteContactDetails(req: Request, res: Response) {
        const contactDetailsId = req.params.id;
        ContactDetail.findOne({_id: contactDetailsId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteEducation(req: Request, res: Response) {
        const educationId = req.params.id;
        Education.findOne({_id: educationId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteEmploymentHistory(req: Request, res: Response) {
        const employmentHistoryId = req.params.id;
        EmploymentHistory.findOne({_id: employmentHistoryId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteLanguage(req: Request, res: Response) {
        const languageId = req.params.id;
        Language.findOne({_id: languageId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteSkill(req: Request, res: Response) {
        const skill_id = req.params.id;
        Skill.findOne({_id: skill_id}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteRefrence(req: Request, res: Response) {
        const refrenceId = req.params.id;
        Refrence.findOne({_id: refrenceId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteAwardAchivements(req: Request, res: Response) {
        const awardAchivementsId = req.params.id;
        AwardAchivements.findOne({_id: awardAchivementsId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteInterest(req: Request, res: Response) {
        const interestId = req.params.id;
        Interest.findOne({_id: interestId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteIndustrialExposure(req: Request, res: Response) {
        const industrialExposureId = req.params.id;
        IndustrialExposure.findOne({_id: industrialExposureId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteProjectDetails(req: Request, res: Response) {
        const projectDetailId = req.params.id;
        ProjectDetails.findOne({_id: projectDetailId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteStrength(req: Request, res: Response) {
        const strengthId = req.params.id;
        Strength.findOne({_id: strengthId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteWeakness(req: Request, res: Response) {
        const weaknessId = req.params.id;
        Weakness.findOne({_id: weaknessId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteObjective(req: Request, res: Response) {
        const objectiveId = req.params.id;
        Objective.findOne({_id: objectiveId}).then((data) => {
            data.remove().then((data) => {
                res.status(200).send(data)
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }


    static importVideo(req: Request, res: Response) {
        const resumeId = req.params.id;
        const video_url = req.body.video_url;
        if (!resumeId) {
            res.status(422).json({
                message: 'please provide a correct Resume  id',
                status_code: 422
            })
        }
        Resume.findOneAndUpdate({_id: resumeId}, {video_url: video_url}, {new: true}).populate(`education skills languages refrences contact_details employment_history 
        award_achivements interests industrialExposures projectDetails strengths weakness objectives`)
            .then((data) => {
                res.status(200).send(data)
            }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }

    static deleteImage(req: Request, res: Response) {
        const resumeId = req.params.id;
        if (!resumeId) {
            return res.status(422).json({
                message: 'please provide a correct resume Id',
                status_code: 422
            })
        }
        Resume.findOneAndUpdate({_id: resumeId}, {image_url: null}, {new: true}).populate(`education skills languages refrences contact_details employment_history 
        award_achivements interests industrialExposures projectDetails strengths weakness objectives`)
            .then((data) => {
                res.status(200).send(data)
            }).catch(err => {
            res.status(500).send(err)
        })
    }
}


//delete working fine on -
// interest
// education
//employment history
