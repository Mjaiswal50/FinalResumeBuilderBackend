import {Environment} from "./environment.interface";
require('dotenv').config()

export const environment :Environment =  {
    production : false,
    db_url: process.env.MONGO_URL
};


//mongodb://shagun:GARGSHAGUN15432@ds139939.mlab.com:39939/resume-dev
