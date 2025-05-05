// ✅ Import the TMDB fetch service
import { fetchFromTMDB } from "../services/tmdb.service.js";

// ✅ Get 1 random trending TV show
export async function getTrendingTv(req, res) {
	try {
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

		// 🎲 Pick one random show from the results
		const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];

		res.json({ success: true, content: randomTv });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// ✅ Get trailers for a specific TV show by ID
export async function getTvTrailers(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
		res.json({ success: true, trailers: data.results });
	} catch (error) {
		// ❌ If the ID is wrong or not found
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// ✅ Get details of a TV show by ID
export async function getTvDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// ✅ Get similar TV shows for a given TV show ID
export async function getSimilarTvs(req, res) {
	const { id } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// ✅ Get TV shows by category (popular, top_rated, on_the_air, airing_today)
export async function getTvsByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}