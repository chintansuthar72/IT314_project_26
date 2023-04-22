const {User,Course} = require('../models/index.model');
const response = require('../utils/responses.util');
const {userValidation} = require('../validations/index.validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        // check is user exists
        const user = await User.findOne({email: req.body.email});
        if(!user) return response.badRequestResponse(res, 'Email does not exist');
        
        // check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return response.badRequestResponse(res, 'Invalid password');
        
        // create and assign a token
        const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET, {expiresIn: '1h'});

        // res.header('authorization', token);
        res.set('authorization', token);
        return response.successResponse(res, { token,user});

    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        if(!['ADMIN'].includes(req.role))
            return response.unauthorizedResponse(res);
        const users = await User.find();
        return response.successResponse(res, users);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return response.successResponse(res, user);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const addUser = async (req, res) => {
    try {
        const {error} = userValidation.validate(req.body);
        if(error) return response.badRequestResponse(res, error.details[0].message);

        const user = await User.findOne({email: req.body.email});
        if(user) return response.badRequestResponse(res, 'Email already exists');

        const username = await User.findOne({username: req.body.username});
        if(username) return response.badRequestResponse(res, 'Username already exists');

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const newUser = await User.create(req.body);
        return response.successfullyCreatedResponse(res, newUser);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const deleteUserById = async (req, res) => {
    try {
        if(!['ADMIN'].includes(req.role))
            return response.unauthorizedResponse(res);
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        return response.successResponse(res, deletedUser);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.id,{
            username: req.body.username,
            phone: req.body.phone,
        });
        return response.successResponse(res, updatedUser);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const getAllCoursesOfUser = async (req, res) => {
    try {
        const userDetail = await User.findById(req.id);
        const courses = userDetail.courses;
        let coursesArray = [];
        for(let i=0; i<courses.length; i++){
            const temp = await Course.findById(courses[i]);
            const teacher = await User.findById(temp.teacher);
            let data = {
                instructor: teacher.username,
                course : temp
            }
            coursesArray.push(data);
        }
        return response.successResponse(res, coursesArray);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

const addCourseToUser = async (req, res) => {
    try {
        const userDetail = await User.findById(req.id);
        const courses = userDetail.courses;
        courses.push(req.params.id);
        const updatedUser = await User.findByIdAndUpdate(req.id,{
            courses: courses
        });
        return response.successResponse(res, updatedUser);
    } catch (err) {
        return response.serverErrorResponse(res, err);
    }
}

module.exports = {
    loginUser,
    getAllUsers,
    getUserById,
    addUser,
    deleteUserById,
    updateUserById,
    getAllCoursesOfUser,
    addCourseToUser
}
