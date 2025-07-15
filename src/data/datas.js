import { useEffect, useState } from "react";

const fetchData = async (url, setter) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    setter(data.results || []);
  } catch (error) {
    console.error("Error fetching data from:", url, error);
  }
};

export const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    fetchData("/api/discover-movies", setMovieList);
  }, []);
  return movieList;
};

export const SeriesList = () => {
  const [seriesList, setSeriesList] = useState([]);
  useEffect(() => {
    fetchData("/api/discover-series", setSeriesList);
  }, []);
  return seriesList;
};

export const TrendMovies = () => {
  const [trendMovieList, setTrendMovieList] = useState([]);
  useEffect(() => {
    fetchData("/api/trending-movies", setTrendMovieList);
  }, []);
  return trendMovieList;
};
