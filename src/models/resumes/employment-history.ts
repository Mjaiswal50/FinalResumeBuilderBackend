import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const employmentHistorySchema = new mongoose.Schema({
    employer: {type: String, required: true},
    designation: {type: String, required: true},
    organisation: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    start_month: {type: String, required: true},
    start_year: {type: Number, required: true},
    end_month: {type: String, required: false},
    end_year: {type: Number, required: false},
});
employmentHistorySchema.post('remove',(doc)=>{
    const data = (doc as any);
    Resume.findOne({employment_history: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {employment_history: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});

export default model('employmentHistory', employmentHistorySchema);