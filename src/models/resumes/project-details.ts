import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const projectDetailSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: String, required: true},
    role: {type: String, required: true},
});

projectDetailSchema.post('remove', (doc) => {
    const data = (doc as any);
    Resume.findOne({projectDetails: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {projectDetails: data._id}}, {new: true}).then(res => {
                console.log(res, 'response hai');
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        console.log(err)
    })
});
export default model('projectDetails', projectDetailSchema);