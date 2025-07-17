import { eventLogs } from "./logEvents";

const errorHandler = (err,req,res,next) => {
    console.error(err.stack);
    eventLogs(`${err.name} :${err.message}`, 'errorLogs.txt');
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
}

export default errorHandler;
