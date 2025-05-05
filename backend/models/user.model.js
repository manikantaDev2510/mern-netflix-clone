// ✅ Import mongoose to define a MongoDB schema
import mongoose from "mongoose";

// ✅ Define the schema for the User collection
const userSchema = mongoose.Schema({
	// ✅ Username is required and must be unique
	username: {
		type: String,
		required: true,
		unique: true,
	},
	// ✅ Email is required and must be unique
	email: {
		type: String,
		required: true,
		unique: true,
	},
	// ✅ Password is required (should be hashed in the controller before saving)
	password: {
		type: String,
		required: true,
	},
	// ✅ Optional profile image URL (can be empty by default)
	image: {
		type: String,
		default: "",
	},
	// ✅ Search history stores recent search terms, default is an empty array
	searchHistory: {
		type: Array,
		default: [],
	},
});

// ✅ Create and export the User model
// NOTE: Mongoose automatically converts "User" to "users" in the DB
export const User = mongoose.model("User", userSchema);
