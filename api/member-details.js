// /api/member-details.js

export default async function handler(req, res) {
  const { id } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  const url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ error: "Failed to fetch member details" });
  }

  res.status(200).json(data);
}
