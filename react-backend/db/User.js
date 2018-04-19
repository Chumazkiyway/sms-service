import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

//схема юзера для бд
const userSchema = new Schema({
    login     : { type: String, unique: true, lowercase: true, index: true },
    pass      : { type: String }
});


const User = mongoose.model('User', userSchema);