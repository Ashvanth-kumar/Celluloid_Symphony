// /api/discover.js

export default async function handler(req, res) {
  const { year = "", type = "movie" } = req.query;
  const API_KEY = process.env.TMDB_API_KEY;

  let url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;

  if (year) {
    url += `&primary_release_year=${year}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch data" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
