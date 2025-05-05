// ✅ Import express to create routes
import express from "express";

// ✅ Import controller functions to handle each route logic
import {
	getSimilarTvs,
	getTrendingTv,
	getTvDetails,
	getTvsByCategory,
	getTvTrailers,
} from "../controllers/tv.controller.js";

// ✅ Initialize an express router
const router = express.Router();

/**
 * ✅ Route to get trending TV shows
 * 🔗 Example: GET /api/v1/tv/trending
 */
router.get("/trending", getTrendingTv);

/**
 * ✅ Route to get trailers for a specific TV show (by ID)
 * 🔗 Example: GET /api/v1/tv/1324/trailers
 */
router.get("/:id/trailers", getTvTrailers);

/**
 * ✅ Route to get detailed information for a specific TV show (by ID)
 * 🔗 Example: GET /api/v1/tv/1234/details
 */
router.get("/:id/details", getTvDetails);

/**
 * ✅ Route to get similar TV shows (based on a given show ID)
 * 🔗 Example: GET /api/v1/tv/1234/similar
 */
router.get("/:id/similar", getSimilarTvs);

/**
 * ✅ Route to get TV shows by category
 * Supported categories: popular, top_rated, on_the_air, airing_today
 * 🔗 Example: GET /api/v1/tv/popular
 */
router.get("/:category", getTvsByCategory);

// ✅ Export the router to be used in other files (like main server.js)
export default router;