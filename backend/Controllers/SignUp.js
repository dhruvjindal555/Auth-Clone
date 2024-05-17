const User = require('../Models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const SECRET = 'SECURE_PASSWORD';
var validator = require('validator');
var jwt = require('jsonwebtoken');
const Signup = async (req, res) => {
    try {
        const oldUser = await User.findOne({ number: req.body.number })
        if (oldUser) {
            res.json({ "success": "false" })
            console.log("User already existed");
        } else {
            const { name, email, number, password } = req.body

            const newUser = new User()
            // if (!email&&validator.isEmail(email)) {

            newUser.email = email
            if (validator.isMobilePhone(number)) {
                newUser.number = number
            } else {
                console.log("Enter a valid number");
                return res.json({ "success": "true", "message": "Enter a valid number" })
            }
            // } else {
            //     console.log("Enter a valid email address");
            //     return res.send("Enter a valid email address ")
            // }

            newUser.name = name


            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPass = bcrypt.hashSync(password, salt);

            // Store hash in your password DB.
            newUser.password = hashedPass

            const data = {
                user: {
                    id: newUser.id
                }
            }
            var token = jwt.sign({ data }, SECRET);

            console.log(newUser);
            await newUser.save()
            res.json({ "success": "true", "authToken": token })
            console.log("User created successfully");
        }

    } catch (error) {
        res.json({ "success": "false" ,"message":error.message})
        console.log({ "Error": error });
    }
}


module.exports = Signup