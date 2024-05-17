const User = require('../Models/user')
var validator = require('validator');




const checkEmail = async (req, res) => {
    try {
        const { email, password } = req.body
        const credentialOne = email
        if (validator.isEmail(credentialOne)) {
            const user = await User.findOne({ "email": credentialOne })
            if (user) {

                return res.json({ "success": "True", "message": "Enter a valid credentials" })
            } else {
                console.log("User does not exist for email");
                return res.json({ "success": "false", "message": "Enter a valid credentials" })

            }
        } else {
            if (validator.isMobilePhone(credentialOne)) {
                const user = await User.findOne({ "number": credentialOne })
                if (user) {
                    return res.json({ "success": "True", "message": "User exist" })

                } else {
                    console.log("User does not exist for number");
                    return res.json({ "success": "false", "message": "User does not exist" })

                }
            } else {
                console.log("Enter a valid credentials");
                return res.json({ "success": "false", "message": "Enter a valid credentials" })

            }

        }
    } catch (error) {
        res.json({ "success": "false", "message": error.message })
        console.log({ "Error": error });
    }

}

module.exports = checkEmail