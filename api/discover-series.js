export default async function handler(req, res) {
  const API_KEY = process.env.TMDB_API_KEY;

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch discover series" });
  }
}
