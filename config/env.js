import {config} from 'dotenv';

config({
    path : `.env.${process.env.NODE_ENV || 'development'}.local`
})
export const {PORT, DB_URI, NODE_ENV, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;