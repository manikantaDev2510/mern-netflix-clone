// import { User } from "../models/user.model.js";
// import { fetchFromTMDB } from "../services/tmdb.service.js";

// export async function searchPerson(req, res) {
// 	const { query } = req.params;
// 	try {
// 		const response = await fetchFromTMDB(
// 			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
// 		);

// 		if (response.results.length === 0) {
// 			return res.status(404).send(null);
// 		}

// 		await User.findByIdAndUpdate(req.user._id, {
// 			$push: {
// 				searchHistory: {
// 					id: response.results[0].id,
// 					image: response.results[0].profile_path,
// 					title: response.results[0].name,
// 					searchType: "person",
// 					createdAt: new Date(),
// 				},
// 			},
// 		});

// 		res.status(200).json({ success: true, content: response.results });
// 	} catch (error) {
// 		console.log("Error in searchPerson controller: ", error.message);
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function searchMovie(req, res) {
// 	const { query } = req.params;

// 	try {
// 		const response = await fetchFromTMDB(
// 			`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
// 		);

// 		if (response.results.length === 0) {
// 			return res.status(404).send(null);
// 		}

// 		await User.findByIdAndUpdate(req.user._id, {
// 			$push: {
// 				searchHistory: {
// 					id: response.results[0].id,
// 					image: response.results[0].poster_path,
// 					title: response.results[0].title,
// 					searchType: "movie",
// 					createdAt: new Date(),
// 				},
// 			},
// 		});
// 		res.status(200).json({ success: true, content: response.results });
// 	} catch (error) {
// 		console.log("Error in searchMovie controller: ", error.message);
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function searchTv(req, res) {
// 	const { query } = req.params;

// 	try {
// 		const response = await fetchFromTMDB(
// 			`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
// 		);

// 		if (response.results.length === 0) {
// 			return res.status(404).send(null);
// 		}

// 		await User.findByIdAndUpdate(req.user._id, {
// 			$push: {
// 				searchHistory: {
// 					id: response.results[0].id,
// 					image: response.results[0].poster_path,
// 					title: response.results[0].name,
// 					searchType: "tv",
// 					createdAt: new Date(),
// 				},
// 			},
// 		});
// 		res.json({ success: true, content: response.results });
// 	} catch (error) {
// 		console.log("Error in searchTv controller: ", error.message);
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function getSearchHistory(req, res) {
// 	try {
// 		res.status(200).json({ success: true, content: req.user.searchHistory });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function removeItemFromSearchHistory(req, res) {
// 	let { id } = req.params;

// 	id = parseInt(id);

// 	try {
// 		await User.findByIdAndUpdate(req.user._id, {
// 			$pull: {
// 				searchHistory: { id: id },
// 			},
// 		});

// 		res.status(200).json({ success: true, message: "Item removed from search history" });
// 	} catch (error) {
// 		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }





// ✅ Import necessary modules
import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

// 🔍 Search for a person (actor, director, etc.)
export async function searchPerson(req, res) {
	const { query } = req.params;
	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
		);

		// ❌ No results found
		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// ✅ Store in user's search history
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].profile_path,
					title: response.results[0].name,
					searchType: "person",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchPerson controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// 🎬 Search for movies
export async function searchMovie(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// 📺 Search for TV shows
export async function searchTv(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
		);

		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// 📂 Get user's search history
export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// ❌ Remove a specific item from search history
export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params;

	id = parseInt(id); // Convert from string to number

	try {
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}