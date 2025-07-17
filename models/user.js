import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: [true, 'Username is required'],
        unique: true,
        trim: true,
        maxlength: [20, 'Username cannot be more than 20 characters'],
        minlength: [3, 'Username cannot be less than 3 characters']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        minlength: [6, 'Password cannot be less than 6 characters'],
    }, refreshToken: {
        type: String,
        default: null
    }
})

const User = mongoose.model('User', userSchema);

export default User;