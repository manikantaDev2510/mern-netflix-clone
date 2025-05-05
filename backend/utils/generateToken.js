// ✅ Import jwt module to handle token creation
import jwt from "jsonwebtoken";

// ✅ Import environment variables (contains JWT secret, etc.)
import { ENV_VARS } from "../config/envVars.js";

/**
 * ✅ Function to generate a JWT (JSON Web Token) and set it as a cookie in the response.
 * @param {String} userId - The ID of the user to include in the token payload.
 * @param {Object} res - The Express response object to set the cookie.
 */
export const generateTokenAndSetCookie = (userId, res) => {
    // 🔐 Generate a JWT using the user's ID and secret key. Token expires in 15 days.
    const token = jwt.sign(
        { userId },                 // Payload: user ID will be encoded in the token
        ENV_VARS.JWT_SECRET,       // Secret key to sign the token (keep it private!)
        { expiresIn: "15d" }       // Token will expire in 15 days
    );

    // 🍪 Set the token in a cookie named "jwt-netflix"
    res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days (converted to milliseconds)
        httpOnly: true,                  // 🔐 Prevents JavaScript access to the cookie (helps prevent XSS attacks)
        sameSite: "strict",              // 🛡️ Prevents CSRF attacks by only allowing same-site requests
        secure: ENV_VARS.NODE_ENV !== "development", // Use secure HTTPS cookies in production
    });

    // Return the token in case you need to use it in the backend as well
    return token;
};