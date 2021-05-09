import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";


const strengthSchema = new mongoose.Schema({
    name: {type: String, required: true},
});
strengthSchema.post('remove', ((doc) => {

    const data = (doc as any);
    Resume.findOne({strengths: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {strengths: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}));

export default model('strength', strengthSchema);