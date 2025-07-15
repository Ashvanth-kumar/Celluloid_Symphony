const BASE_URL = "https://api.themoviedb.org/3";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTEwYmYzOTk3NDM4YjdjNWVkMjc1MzBmODhhMjhkNCIsIm5iZiI6MTc1MjU4MjE0Ni44MDMsInN1YiI6IjY4NzY0ODAyYWFmNTU3MGQ0MWEyNDM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OSQRmi97Imj2OJecjMXE_mnFjiH1xYAIHxLT4c7rLFU";

const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data.results || data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchReviews = (id, type) => {
  return fetchData(`${BASE_URL}/${type}/${id}/reviews?language=en-US&page=1`);
};

export const fetchVideos = (id, type) => {
  return fetchData(`${BASE_URL}/${type}/${id}/videos?language=en-US`);
};

export const fetchTVCredits = (id) => {
  return fetchData(`${BASE_URL}/tv/${id}/credits?language=en-US`);
};

export const fetchMovieCredits = (id) => {
  return fetchData(`${BASE_URL}/movie/${id}/credits?language=en-US`);
};

export const fetchImages = (id, type) => {
  return fetchData(`${BASE_URL}/${type}/${id}/images`);
};

export const fetchCredits = async (
  memberDetails,
  apiKey,
  setMovieCredits,
  setTvCredits,
  setIsLoading
) => {
  try {
    setIsLoading(true);

    const movieResponse = await fetch(
      `${BASE_URL}/person/${memberDetails.id}/movie_credits?api_key=${apiKey}&language=en-US`
    );
    const movieData = await movieResponse.json();
    setMovieCredits(movieData.cast || []);

    const tvResponse = await fetch(
      `${BASE_URL}/person/${memberDetails.id}/tv_credits?api_key=${apiKey}&language=en-US`
    );
    const tvData = await tvResponse.json();
    setTvCredits(tvData.cast || []);
  } catch (error) {
    console.error("Error fetching credits:", error);
  } finally {
    setIsLoading(false);
  }
};
