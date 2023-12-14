import { body, validationResult } from "express-validator";

const RegisterValidations = () => {
    return [
        body("fullName", "Full Name is Required").notEmpty().isLength({ min: 2, max: 25 }).withMessage("Length shuld be >2, <25 letters"),
        body("displayName").notEmpty().isLength({ min: 2, max: 25 }).withMessage("Display Name is Required"),

        body("email", "Should be a Valid Email").isEmail(),
        body("phone").isMobilePhone().withMessage("Should be a Valid Phone Number"),

        body("password").notEmpty().isLength({ min: 4, max: 16 }).withMessage("password is Required"),

        body("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password did Not Match")
            }
            return true
        }),

    ]
}

const LoginValidations = () => {
    return [
        body("email", "Should be a Valid Email").isEmail(),
        body("password").notEmpty().isLength({ min: 4, max: 16 }).withMessage("Password is Required")
    ]
}

const projectValidations = () => {
    return [
        body("projectName", "Project Name is Required").notEmpty().isLength({ min: 2, max: 25 }),
        body("description", "Description of the Project").isLength({max :350}),
        body("status").notEmpty().withMessage("Status is Either 'Pending', 'Completed', 'Not Started', 'Cancelled', 'In Progress'")
        ]
}

function errorMiddelware(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors["errors"] })
    }
    return next();
}

export { RegisterValidations, LoginValidations, projectValidations, errorMiddelware }