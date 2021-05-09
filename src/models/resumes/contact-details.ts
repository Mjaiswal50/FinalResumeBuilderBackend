import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";


const contactDetailsSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip_code: {type: Number, required: true},
    country: {type: String, required: true},
    summary: {type: String, required: true},
    linkedin_url : {type:String,required:false ,  default: null},
    website_url : {type:String,required:false ,  default: null},
});
//d2
contactDetailsSchema.post('remove', (doc) => {
    const data = (doc as any);
    Resume.findOne({'contact_details._id': data._id}).then((response) => {
        if (response) {
            response.update({$pull: {'contact_details._id': data._id}}, {new: true}).then(res => {
                console.log(res, 'response hai');
            }).catch(err => {
                console.log(err)
            })
        }
    }).catch(err => {
        console.log(err)
    })
});

export default model('contactDetails', contactDetailsSchema);