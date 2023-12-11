import { body, validationResult } from "express-validator";

const RegisterValidations = () => {
    return [
        body("fullName", "Full Name is required").notEmpty().isLength({ min: 2, max: 25 }).withMessage("Length shuld be >2, <25 letters"),
        body("displayName").notEmpty().isLength({ min: 2, max: 25 }).withMessage("Display name is required"),
        
        body("email", "Should be a Valid Email").isEmail(),
        body("phone").isMobilePhone().withMessage("Should be a Valid Phone Number"),

        body("password").notEmpty().isLength({ min: 4, max: 16 }).withMessage("password is required"),

        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password did not match")
            }
            return true
        }),

    ]
}

const LoginValidations = () => {
    return [
        body("email", "Should be a Valid Email").isEmail(),
        body("password").notEmpty().isLength({ min: 4, max: 16 }).withMessage("password is required")
    ]
}

function errorMiddelware(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors["errors"] })
    }
    return next();
}

export {RegisterValidations, LoginValidations , errorMiddelware}