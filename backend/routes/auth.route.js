// ✅ Import express to create route handlers
import express from "express";

// ✅ Import controller functions that handle auth logic
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js";

// ✅ Import middleware to protect certain routes
import { protectRoute } from "../middleware/protectRoute.js";

// ✅ Initialize express router
const router = express.Router();

/**
 * ✅ Route to register a new user
 * 🔗 Example: POST /api/v1/auth/signup
 * 📦 Body: { username, email, password }
 */
router.post("/signup", signup);

/**
 * ✅ Route to log in a user
 * 🔗 Example: POST /api/v1/auth/login
 * 📦 Body: { email, password }
 */
router.post("/login", login);

/**
 * ✅ Route to log out the current user
 * 🔗 Example: POST /api/v1/auth/logout
 */
router.post("/logout", logout);

/**
 * ✅ Route to check if a user is authenticated
 * ✅ Protected with middleware (must be logged in)
 * 🔗 Example: GET /api/v1/auth/authCheck
 */
router.get("/authCheck", protectRoute, authCheck);

// ✅ Export router to be used in the main server
export default router;
