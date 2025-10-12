import { useState, useEffect, createContext, useContext, useMemo } from 'react';

const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export function MovieProvider({ children }) {
  const [allMovies, setAllMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadMoviesFromStorage = () => {
    const cachedDataString = localStorage.getItem('movieData');
    if (cachedDataString) {
      const { movies } = JSON.parse(cachedDataString);
      setAllMovies(movies || []);
    }
  };

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
    loadMoviesFromStorage();
  }, []);

  const handleToggleWatchlist = (movieId, event) => {
    if(event){
    event.stopPropagation();
    event.preventDefault();
    }
    const updatedWatchlist = watchlist.includes(movieId)
      ? watchlist.filter(id => id !== movieId)
      : [...watchlist, movieId];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }
    return allMovies.filter(movie =>
      movie.originalTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allMovies, searchTerm]);

  const value = {
    allMovies,
    filteredMovies,
    watchlist,
    searchTerm,
    setSearchTerm,
    onToggleWatchlist: handleToggleWatchlist,
    refreshMovies: loadMoviesFromStorage, 
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}