import * as mongoose from "mongoose";
import {model} from "mongoose";


const resumeSchema = new mongoose.Schema({
    user_id: {type: String, required: true, unique: false},
    name: {type: String, required: true},
    image_url: {type: String, required: false, default: null},
    video_url: {type: String, required: false, default: null},
    views: {type: Number, required: false, default: 0},
    contact_details: {type: mongoose.Schema.Types.ObjectId, ref: 'contactDetails'},
    education: [{type: mongoose.Schema.Types.ObjectId, ref: 'education'}],
    employment_history: [{type: mongoose.Schema.Types.ObjectId, ref: 'employmentHistory'}],
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'skills'}],
    languages: [{type: mongoose.Schema.Types.ObjectId, ref: 'languages'}],
    refrences: [{type: mongoose.Schema.Types.ObjectId, ref: 'refrences'}],
    award_achivements: [{type: mongoose.Schema.Types.ObjectId, ref: 'awardsAchivements'}],
    interests: [{type: mongoose.Schema.Types.ObjectId, ref: 'interest'}],
    industrialExposures: [{type: mongoose.Schema.Types.ObjectId, ref: 'industrialExposure'}],
    projectDetails: [{type: mongoose.Schema.Types.ObjectId, ref: 'projectDetails'}],
    strengths: [{type: mongoose.Schema.Types.ObjectId, ref: 'strength'}],
    weakness: [{type: mongoose.Schema.Types.ObjectId, ref: 'weakness'}],
    objectives: [{type: mongoose.Schema.Types.ObjectId, ref: 'objectives'}],
});

resumeSchema.post('remove', (data) => {
    console.log(data);
    const contact_detals = mongoose.model('contactDetails');
    const education = mongoose.model('education');
    const employment_history = mongoose.model('employmentHistory');
    const skills = mongoose.model('skills');
    const languages = mongoose.model('languages');
    const refrences = mongoose.model('refrences');
    const award_achivements = mongoose.model('awardsAchivements');
    const interests = mongoose.model('interest');
    const industrial_exposure = mongoose.model('industrialExposure');
    const project_details = mongoose.model('projectDetails');
    const strengths = mongoose.model('strength');
    const weaknessModel = mongoose.model('weakness');
    const objectiesModel = mongoose.model('objectives');
//d1
    const doc = (data as any);
    if (doc.contact_details) {
        contact_detals.remove({_id: doc.contact_details}).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    }
    const a = education.remove({_id: {$in: doc.education}});
    const b = employment_history.remove({_id: {$in: doc.employment_history}});
    const c = skills.remove({_id: {$in: doc.skills}});
    const d = languages.remove({_id: {$in: doc.languages}});
    const e = refrences.remove({_id: {$in: doc.refrences}});
    const f = award_achivements.remove({_id: {$in: doc.award_achivements}});
    const i = interests.remove({_id: {$in: doc.interests}});
    const j = industrial_exposure.remove({_id: {$in: doc.industrialExposures}});
    const k = project_details.remove({_id: {$in: doc.projectDetails}});
    const l = strengths.remove({_id: {$in: doc.strengths}});
    const m = weaknessModel.remove({_id: {$in: doc.weakness}});
    const n = objectiesModel.remove({_id: {$in: doc.objectives}});
    Promise.all([a, b, c, d, e, f, i, j, k, l, m, n]).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error, 'error hai');
    })
});

export default model('resume', resumeSchema);