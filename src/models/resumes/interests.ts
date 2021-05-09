import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const interestSchema = new mongoose.Schema({
    interest: {type: String, required: true},
});

interestSchema.post('remove',(doc)=>{
    const data = (doc as any);
    Resume.findOne({interests: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {interests: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});
export default model('interest', interestSchema);