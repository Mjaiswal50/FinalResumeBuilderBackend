import * as mongoose from "mongoose";
import {model} from "mongoose";
import Resume from "./resume";

const awardsAchivementsSchema = new mongoose.Schema({
    awards_and_achivements: {type: String, required: true},
});

awardsAchivementsSchema.post('remove',(doc)=>{
    const data = (doc as any);
    Resume.findOne({award_achivements: {$in: [data._id]}}).then((response) => {
        if (response) {
            response.update({$pull: {award_achivements: data._id}}, {new: true}).then(res => {
                console.log(res,'response hai');
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
});
export default model('awardsAchivements', awardsAchivementsSchema);