import { eventLogs } from "./logEvents.js";

const errorHandler = (err,req,res,next) => {
    console.error(err.stack);
    eventLogs(`${err.name} : ${err.message}`, 'errorLogs.txt');
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    })
}

export default errorHandler;
