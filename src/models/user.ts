import * as mongoose from "mongoose";
import {model} from "mongoose";
import * as moment from "moment";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    name: {type: String, required: true},
    onboarding: {type: Number, required: true, default: false},
    verified: {type: Boolean, required: true, default: false},
    code: {type: String, required: true},
    last_active: {type: String, required: true, default: moment().format('LLLL')},
    job_category: {type: String, required: true},
    experience_level: {type: String, required: true}
});

export default model('user', userSchema);