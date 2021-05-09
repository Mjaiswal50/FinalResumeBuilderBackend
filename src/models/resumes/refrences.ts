import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const referencesSchema = new mongoose.Schema({
    name: {type: String, required: true},
    relationship: {type: String, required: true},
    company: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
});

referencesSchema.post('remove',(doc)=>{
    const data = (doc as any);
    Resume.findOne({refrences: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {refrences: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});
export default model('refrences', referencesSchema);