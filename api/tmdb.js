// /api/tmdb.js

export default async function handler(req, res) {
  const { type, id, media = "movie" } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  let url = "";
  switch (type) {
    case "reviews":
      url = `https://api.themoviedb.org/3/${media}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
      break;
    case "videos":
      url = `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${API_KEY}&language=en-US`;
      break;
    case "images":
      url = `https://api.themoviedb.org/3/${media}/${id}/images?api_key=${API_KEY}`;
      break;
    case "movie_credits":
      url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`;
      break;
    case "tv_credits":
      url = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${API_KEY}&language=en-US`;
      break;
    case "person":
      url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
      break;
    default:
      return res.status(400).json({ error: "Invalid or missing 'type' parameter" });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch TMDB data" });
  }
}
