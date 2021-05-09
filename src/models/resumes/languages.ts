import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const languagesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    level: {type: String, required: true},
});

languagesSchema.post('remove',(doc)=>{
    const data = (doc as any);
    Resume.findOne({languages: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {languages: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});
export default model('languages', languagesSchema);