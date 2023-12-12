import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import config from "config";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header["auth-token"] || req.header["authorization"];
        if (!token) {
            return res.status(401).json({ success: false, error: "Token is Not provided - Check the path" })
        }
        // Advanced Encyption System
        const decryptedToken = CryptoJS.AES.decrypt(token, config.get("SECRET-KEY.CRYPTO"));
        const originalText = decryptedToken.toString(CryptoJS.enc.Utf8);

        jwt.verify(originalText, config.get("SECRET-KEY.JWT"));
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Unauthorized Access" })
    }
}

export default authMiddleware;