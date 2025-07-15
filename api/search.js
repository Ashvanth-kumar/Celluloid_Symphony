// /api/search.js

export default async function handler(req, res) {
  const query = req.query.query; // From URL query param
  const API_KEY = process.env.TMDB_API_KEY;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is missing" });
  }

  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch search results" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
