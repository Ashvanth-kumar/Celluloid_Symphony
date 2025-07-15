// api/tv-credits.js
export default async function handler(req, res) {
  const { id } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  const url = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch TV credits" });
  }
}
