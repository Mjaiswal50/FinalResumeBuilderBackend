import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const educationSchema = new mongoose.Schema({
    school_name: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    field: {type: String, required: true},
    percentage: {type: String, required: true},
    degree_type: {type: String, required: true},
    graduation_month: {type: String, required: true},
    graduation_year: {type: Number, required: true},
});

educationSchema.post('remove',(doc)=>{
    const data = (doc as any);
    Resume.findOne({education: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {education: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});

export default model('education', educationSchema);