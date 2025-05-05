// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";
// import { ENV_VARS } from "../config/envVars.js";

// export const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies["jwt-netflix"];

// 		if (!token) {
// 			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
// 		}

// 		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

// 		if (!decoded) {
// 			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userId).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ success: false, message: "User not found" });
// 		}

// 		req.user = user;

// 		next();
// 	} catch (error) {
// 		console.log("Error in protectRoute middleware: ", error.message);
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// };




// ✅ Import JWT to verify tokens
import jwt from "jsonwebtoken";

// ✅ Import the User model to fetch user data from DB
import { User } from "../models/user.model.js";

// ✅ Import environment variables (like JWT secret)
import { ENV_VARS } from "../config/envVars.js";

// ✅ Middleware to protect routes (only allow logged-in users)
export const protectRoute = async (req, res, next) => {
	try {
		// ✅ Get the token from cookie named 'jwt-netflix'
		const token = req.cookies["jwt-netflix"];

		// ❌ If no token found, block access
		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
		}

		// ✅ Verify the token using secret key
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		// ❌ If decoding fails, block access
		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}

		// ✅ Find user in DB by decoded ID (omit password for safety)
		const user = await User.findById(decoded.userId).select("-password");

		// ❌ If user not found in DB, block access
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// ✅ Attach user to request so we can use it in next functions
		req.user = user;

		// ✅ Allow request to continue
		next();
	} catch (error) {
		// ❗ Handle unexpected errors
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};
