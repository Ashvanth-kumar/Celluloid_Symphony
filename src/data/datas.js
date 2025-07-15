import { useState, useEffect } from "react";

const fetchData = async (url, setData) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setData(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/discover/movie?api_key=1910bf3997438b7c5ed27530f88a28d4",
      setMovieList
    );
  }, []);
  return movieList;
};

const SeriesList = () => {
  const [seriesList, setSeriesList] = useState([]);
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/discover/tv?api_key=1910bf3997438b7c5ed27530f88a28d4",
      setSeriesList
    );
  }, []);
  return seriesList;
};

const TrendMovies = () => {
  const [trendMovieList, setTrendMovieList] = useState([]);
  useEffect(() => {
    fetchData(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=1910bf3997438b7c5ed27530f88a28d4&language=en-US",
      setTrendMovieList
    );
  }, []);
  return trendMovieList;
};

export { MovieList, SeriesList, TrendMovies };
