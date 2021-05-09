import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";


const objectiveSchema = new mongoose.Schema({
    objective: {type: String, required: true},
    date: {type: Number, required: true},
    place: {type: String, required: true},
    declaration: {type: String, required: true},
});
objectiveSchema.post('remove', ((doc) => {

    const data = (doc as any);
    Resume.findOne({objectives: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {objectives: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
}));

export default model('objectives', objectiveSchema);