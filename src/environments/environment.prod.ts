import { DiffieHellman } from "crypto";
import {Environment} from "./environment.interface";

export const environment: Environment = {
    production: true,
    db_url: 'mongodb+srv://mjaiswal50:dbpassword@cluster0.5zlyy.mongodb.net/mydatabase?retryWrites=true&w=majority'
};