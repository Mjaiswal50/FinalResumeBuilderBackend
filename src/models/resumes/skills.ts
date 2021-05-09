import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "../resumes/resume";

const skillsSchema = new mongoose.Schema({
    skill: {type: String, required: true},
    level: {type: String, required: true},
});
skillsSchema.post('remove', ((doc) => {

    const data = (doc as any);
    Resume.findOne({skills: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {skills: data._id}}, {new: true}).then(res => {
                console.log(res, 'response hai');
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        console.log(err)
    })
}));
export default model('skills', skillsSchema);