import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "../resumes/resume";

const weaknessSchema = new mongoose.Schema({
    name: {type: String, required: true},
});
weaknessSchema.post('remove', ((doc) => {

    const data = (doc as any);
    Resume.findOne({weakness: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {weakness: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}));

export default model('weakness', weaknessSchema);