import {Router} from "express";
import {auth} from "../middleware/middlewares";
import {ResumeController} from "../controller/resume-controller";
import * as multer from 'multer'



const storage =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 6
    }
});

class ResumeRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }


    routes() {
        // adding routes for resume
        this.router.post('/add/resume', auth, ResumeController.addResume);
        this.router.post('/add/contactDetails/:id', auth, ResumeController.addContactDetails);
        this.router.post('/add/education/:id', auth, ResumeController.addEducation);
        this.router.post('/add/employmentHistory/:id', auth, ResumeController.addEmploymentHistory);
        this.router.post('/add/language/:id', auth, ResumeController.addLanguages);
        this.router.post('/add/skill/:id', auth, ResumeController.addSkills);
        this.router.post('/add/refrence/:id', auth, ResumeController.addRefrences);
        this.router.post('/add/award/:id', auth, ResumeController.addAwardsAndAchivements);
        this.router.post('/add/interest/:id', auth, ResumeController.addInterest);
        this.router.post('/add/industrialExposure/:id', auth, ResumeController.addIndustrialExposure);
        this.router.post('/add/projectDetail/:id', auth, ResumeController.addProjectDetails);
        this.router.post('/add/strength/:id', auth, ResumeController.addStrength);
        this.router.post('/add/weakness/:id', auth, ResumeController.addWeakness);
        this.router.post('/add/objective/:id', auth, ResumeController.addObjectives);
        this.router.post('/add/image/:id', auth, upload.single('profile_image'), ResumeController.addImage);
        this.router.post('/add/pdf', ResumeController.renderPDF);
        this.router.get('/get/pdf');

        // get Routes for resume

        this.router.get('/all', auth, ResumeController.getAllResume);
        this.router.get('/:id', ResumeController.getResume);
        // Updating routes for resume
        this.router.patch('/update/resume/:id', auth, ResumeController.updateResume);
        this.router.patch('/update/resume/views/:id', ResumeController.updateResumeViews);
        this.router.patch('/update/contactDetails/:id', auth, ResumeController.updateContactDetails);
        this.router.patch('/update/education/:id', auth, ResumeController.updateEducation);
        this.router.patch('/update/employmentHistory/:id', auth, ResumeController.updateEmploymentHistory);
        this.router.patch('/update/language/:id', auth, ResumeController.updateLanguage);
        this.router.patch('/update/skill/:id', auth, ResumeController.updateSkill);
        this.router.patch('/update/refrence/:id', auth, ResumeController.updateRefrence);
        this.router.patch('/update/awardAchivements/:id', auth, ResumeController.updateAwardAchivements);
        this.router.patch('/update/interest/:id', auth, ResumeController.updateInterest);
        this.router.patch('/update/industrialExposure/:id', auth, ResumeController.updateIndustrialExposure);
        this.router.patch('/update/projectDetail/:id', auth, ResumeController.updateProjectDetails);
        this.router.patch('/update/strength/:id', auth, ResumeController.updateStrength);
        this.router.patch('/update/weakness/:id', auth, ResumeController.updateWeakness);
        this.router.patch('/update/objective/:id', auth, ResumeController.updateObjective);
        this.router.patch('/import/video/:id', auth, ResumeController.importVideo);


        // delete routes for resume
        this.router.delete('/delete/resume/:id', auth, ResumeController.deleteResume);
        this.router.delete('/delete/contactDetails/:id', auth, ResumeController.deleteContactDetails);
        this.router.delete('/delete/education/:id', auth, ResumeController.deleteEducation);
        this.router.delete('/delete/employmentHistory/:id', auth, ResumeController.deleteEmploymentHistory);
        this.router.delete('/delete/language/:id', auth, ResumeController.deleteLanguage);
        this.router.delete('/delete/skill/:id', auth, ResumeController.deleteSkill);
        this.router.delete('/delete/refrence/:id', auth, ResumeController.deleteRefrence);
        this.router.delete('/delete/awardAchivements/:id', auth, ResumeController.deleteAwardAchivements);
        this.router.delete('/delete/interest/:id', auth, ResumeController.deleteInterest);
        this.router.delete('/delete/industrialExposure/:id', auth, ResumeController.deleteIndustrialExposure);
        this.router.delete('/delete/projectDetail/:id', auth, ResumeController.deleteProjectDetails);
        this.router.delete('/delete/strength/:id', auth, ResumeController.deleteStrength);
        this.router.delete('/delete/weakness/:id', auth, ResumeController.deleteWeakness);
        this.router.delete('/delete/objective/:id', auth, ResumeController.deleteObjective);
        this.router.delete('/delete/image/:id', auth, ResumeController.deleteImage);
    }
}

export default new ResumeRouter().router;

// fs.readFile(__dirname + '/resume.pdf', ((err, data) => {
//             console.log(data);
//             res.type('application/pdf');
//             res.end(data,'binary')
//         }));
