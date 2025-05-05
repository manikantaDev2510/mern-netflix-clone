// ✅ Import express to create routes
import express from "express";

// ✅ Import controller functions to handle each route's logic
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	searchMovie,
	searchPerson,
	searchTv,
} from "../controllers/search.controller.js";

// ✅ Initialize a new router instance
const router = express.Router();

/**
 * ✅ Search for a person (like an actor or director) by name
 * 🔗 Example: GET /api/v1/search/person/Chris
 */
router.get("/person/:query", searchPerson);

/**
 * ✅ Search for a movie by title
 * 🔗 Example: GET /api/v1/search/movie/Avengers
 */
router.get("/movie/:query", searchMovie);

/**
 * ✅ Search for a TV show by title
 * 🔗 Example: GET /api/v1/search/tv/Breaking
 */
router.get("/tv/:query", searchTv);

/**
 * ✅ Get the user's search history
 * 🔗 Example: GET /api/v1/search/history
 */
router.get("/history", getSearchHistory);

/**
 * ✅ Remove an item from the user's search history by ID
 * 🔗 Example: DELETE /api/v1/search/history/1234
 */
router.delete("/history/:id", removeItemFromSearchHistory);

// ✅ Export this router to be used in the main server file
export default router;
