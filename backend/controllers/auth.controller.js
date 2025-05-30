import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// 📝 Signup Controller
export async function signup(req, res) {
	try {
		const { email, password, username } = req.body;

		// Basic validation
		if (!email || !password || !username) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Invalid email" });
		}

		if (password.length < 6) {
			return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
		}

		// Check for existing user by email or username
		const existingUserByEmail = await User.findOne({ email });
		if (existingUserByEmail) {
			return res.status(400).json({ success: false, message: "Email already exists" });
		}

		const existingUserByUsername = await User.findOne({ username });
		if (existingUserByUsername) {
			return res.status(400).json({ success: false, message: "Username already exists" });
		}

		// Hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// Random default profile picture
		const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

		// Create user
		const newUser = new User({ email, password: hashedPassword, username, image });

		// Generate token and save user
		generateTokenAndSetCookie(newUser._id, res);
		await newUser.save();

		// Return response without password
		res.status(201).json({
			success: true,
			user: { ...newUser._doc, password: "" },
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

// 🔐 Login Controller
export async function login(req, res) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			success: true,
			user: { ...user._doc, password: "" },
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

// 🚪 Logout Controller
export async function logout(req, res) {
	try {
		res.clearCookie("jwt-netflix");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

// ✅ Auth Check Controller (for checking if user is logged in)
export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user); // Added by middleware like verifyToken
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}