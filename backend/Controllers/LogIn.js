require('dotenv').config()
const User = require('../Models/user')
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
var validator = require('validator');
var jwt = require('jsonwebtoken');




const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const credentialOne = email
        if (validator.isEmail(credentialOne)) {
            const user = await User.findOne({ "email": credentialOne })
            if (user) {

                if (bcrypt.compareSync(password, user.password)) {
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                    var token = jwt.sign({ data }, SECRET);
                    return res.json({ "success": "true", "auth-token": token })
                } else {
                    console.log("Wrong password");
                    return res.json({ "success": "true", "message": "Enter a valid credentials" })
                }
            } else {
                console.log("User does not exist");
                return res.json({ "success": "true", "message": "Enter a valid credentials" })

            }
        } else {
            if (validator.isMobilePhone(credentialOne)) {
                const user = await User.findOne({ "number": credentialOne })
                if (user) {

                    if (bcrypt.compareSync(password, user.password)) {
                        const data = {
                            user: {
                                id: user.id
                            }
                        }
                        var token = jwt.sign({ data }, SECRET);
                        return res.json({ "success": "true", "auth-token": token })
                    } else {
                        console.log("Wrong password for password");
                        return res.json({ "success": "true", "message": "Enter a valid credentials" })

                    }
                } else {
                    console.log("User does not exist for password");
                    return res.json({ "success": "true", "message": "User does not exist" })

                }
            } else {
                console.log("Enter a valid credentials");
                return res.json({ "success": "true", "message": "Enter a valid credentials" })

            }

        }
    } catch (error) {
        res.json({ "success": "false" ,"message":error.message})
        console.log({ "Error": error });
    }

}

module.exports = login