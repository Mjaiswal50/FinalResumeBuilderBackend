import { DiffieHellman } from "crypto";
import {Environment} from "./environment.interface";

export const environment: Environment = {
    production: true,
    db_url: 'xyzmongocollections'
};
