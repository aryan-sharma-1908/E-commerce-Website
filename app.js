import express from 'express';
import cors from 'cors';
import corsOptions from './middlewares/corsOptions.js';

const app = express();
app.use(cors(corsOptions));
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})