const whiteList = ['http://localhost:5500', 'http://localhost:5500'];
const corsOptions = {
    origin : (origin, callback) => {
        if(!origin || whiteList.indexOf(origin) !== -1) {
            callback(null,true);
        } else {
            callback(new Error('not allowed by CORS'));
        }
    }
}
export default corsOptions;