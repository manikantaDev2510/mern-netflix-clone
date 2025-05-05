// ✅ Import express to create route handlers
import express from "express";

// ✅ Import controller functions that handle movie logic
import {
	getMovieDetails,
	getMoviesByCategory,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovie,
} from "../controllers/movie.controller.js";

// ✅ Initialize express router
const router = express.Router();

/**
 * ✅ Get trending movies
 * 🔗 Example: GET /api/v1/movie/trending
 */
router.get("/trending", getTrendingMovie);

/**
 * ✅ Get trailers for a movie by ID
 * 🔗 Example: GET /api/v1/movie/123/trailers
 */
router.get("/:id/trailers", getMovieTrailers);

/**
 * ✅ Get detailed info for a movie by ID
 * 🔗 Example: GET /api/v1/movie/123/details
 */
router.get("/:id/details", getMovieDetails);

/**
 * ✅ Get similar movies to a given movie ID
 * 🔗 Example: GET /api/v1/movie/123/similar
 */
router.get("/:id/similar", getSimilarMovies);

/**
 * ✅ Get movies by category
 * Categories include: now_playing, popular, top_rated, upcoming
 * 🔗 Example: GET /api/v1/movie/popular
 */
router.get("/:category", getMoviesByCategory);

// ✅ Export router to be used in the main server
export default router;