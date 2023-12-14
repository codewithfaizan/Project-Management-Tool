import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import config from "config";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers["auth-token"] || req.headers["authorization"] || req.headers.Authorization;
        // console.log(`auth-token - ${authHeader}`)
        if (!authHeader) { return res.status(401)}
        // Advanced Encyption System
        const decryptedToken = CryptoJS.AES.decrypt(authHeader, config.get("SECRET-KEY.CRYPTO"));
        const originalText = decryptedToken.toString(CryptoJS.enc.Utf8);

        const payload = jwt.verify(originalText, config.get("SECRET-KEY.JWT"));
        // console.log(payload);
        req.payload = payload;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: "Unauthorized Access" })
    }
}

export default authMiddleware;