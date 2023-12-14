const verifyRole = (req, res, next) => {
    try {
        const payload = req.payload
        // console.log(`payload in verifyM is ${payload.user_id}`); 
        // console.log(`payload in verifyM is ${payload.role}`);
        const role = payload.role
        if (role == 'admin') { 
            return next(); 
        } else return res.status(404).json({error: "Cannot Access this route"})
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Unauthorized Access" })
    }
}

export default verifyRole;