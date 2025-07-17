import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const registerUser = async (req,res,next) => {
    try {

    const {username , email, password} = req.body;

    if(!username || !email || !password) {
        const error = new Error('Please provide required credentials');
        error.status = 400;
        throw error;
    }

    const duplicate = await User.findOne({email : email.toLowerCase()});

    if(duplicate) {
        const error = new Error('User already exists');
        error.status = 409;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
        username,
        email : email.toLowerCase(),
        password : hashedPassword
    })

    res.status(201).json({
        success: true,
        message: 'User successfully created.',
        user : {
            id : newUser._id,
            username : newUser.username,
            email : newUser.email,
        }
    })
    } catch(err) {
        if(!err.status) {
            err.status = 500;
        }
        next(err);
    }

}

export default registerUser;