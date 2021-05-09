import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const industrialExposureSchema = new mongoose.Schema({
    organisation: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    start_month: {type: String, required: true},
    start_year: {type: Number, required: true},
    end_month: {type: String, required: false},
    end_year: {type: Number, required: false},
    work : {type: String, required: false}
});

industrialExposureSchema.post('remove',(doc)=>{
    const data = (doc as any);
    Resume.findOne({industrialExposures: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {industrialExposures: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});

export default model('industrialExposure', industrialExposureSchema);