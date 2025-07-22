import {format} from 'date-fns';
import {v4 as uuid} from 'uuid';
import fs from 'fs';
import path from 'path';

const eventLogs = async (message, logName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\t HH:mm:ss');
    const eventId = uuid();
    const logMessage = `${dateTime}\t${eventId}\t${message}\n`;

    try {
        const fsPromises = fs.promises;
        const logsDir = path.join(process.cwd(), 'logs');
        if(!fs.existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir, { recursive: true });          
        }
        await fsPromises.appendFile(path.join(logsDir, logName), logMessage);
    } catch(err) {
        console.error('Error writing to log file:', err);
    }
}

const logger = (req, res, next) => {
    eventLogs(`${req.method}\t ${req.url}\t ${req.headers.origin || 'No Origin'}`,'eventLogs.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

export {eventLogs, logger};