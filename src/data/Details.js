const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

export const fetchReviews = (id, media = "movie") =>
  fetchData(`/api/tmdb?type=reviews&id=${id}&media=${media}`);

export const fetchVideos = (id, media = "movie") =>
  fetchData(`/api/tmdb?type=videos&id=${id}&media=${media}`);

export const fetchImages = (id, media = "movie") =>
  fetchData(`/api/tmdb?type=images&id=${id}&media=${media}`);

export const fetchMovieCredits = (id) =>
  fetchData(`/api/tmdb?type=movie_credits&id=${id}`);

export const fetchTVCredits = (id) =>
  fetchData(`/api/tmdb?type=tv_credits&id=${id}`);

export const fetchPersonDetails = (id) =>
  fetchData(`/api/tmdb?type=person&id=${id}`);

// Combined credit fetch for actor profile
export const fetchCredits = async (
  memberDetails,
  setMovieCredits,
  setTvCredits,
  setIsLoading
) => {
  try {
    setIsLoading(true);

    const [movieRes, tvRes] = await Promise.all([
      fetchData(`/api/tmdb?type=movie_credits&id=${memberDetails.id}`),
      fetchData(`/api/tmdb?type=tv_credits&id=${memberDetails.id}`),
    ]);

    setMovieCredits(movieRes.cast || []);
    setTvCredits(tvRes.cast || []);
  } catch (error) {
    console.error("Error fetching credits:", error);
  } finally {
    setIsLoading(false);
  }
};
