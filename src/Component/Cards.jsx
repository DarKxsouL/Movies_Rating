import { Link } from 'react-router';
import HorizontalScroller from './HorizontalScroller';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMovies } from '../Component/MovieContext'; 
import NoMoviePoster from '../assets/NoMoviePoster.png'

// Card is now the main data fetcher and also displays the "Most Popular" list
function Card({ onDataFetched }) {
  const [moviesList, setMovieList] = useState([]);
  const { watchlist, onToggleWatchlist } = useMovies(); // Get watchlist state from context

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const cacheKey = 'movieData';
    const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours

    try {
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const { movies, timestamp } = JSON.parse(cachedData);
        const isCacheFresh = Date.now() - timestamp < cacheDuration

        if (isCacheFresh) {
          console.log('Serving movies from cache.')

          setMovieList(movies)

          console.log(movies)
          return // Stop the function here
        }
      }

      console.log('Cache is stale or empty. Fetching from API.');
      let allMovies = []
      const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_MOVIES_API_KEY, 
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };
      const res = await axios.request(options);
     const dataArray = res.data?.data ?? res.data ?? res.data?.items ?? []

        allMovies = [
          ...allMovies,
          ...(Array.isArray(dataArray) ? dataArray : [])
        ]

      setMovieList(allMovies);
const cachePayload = {
        movies: allMovies,
        timestamp: Date.now()
      }
      localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
      
      onDataFetched(); 
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <>
      <HorizontalScroller>
        {moviesList.map((movie) => {
          const isAddedToWatchlist = watchlist.includes(movie.id);
          return (
            <div key={movie.id} className='poster-container'>
              <div className='playlistBtn' onClick={(e) => onToggleWatchlist(movie.id, e)}>
                <div className="bookmark">
                  {isAddedToWatchlist ? <div className="check-icon"></div> : <div className="plus-icon"></div>}
                </div>
              </div>
              <Link to={'/movie/' + movie.id}>
              {movie.primaryImage? <img src={movie.primaryImage} alt={movie.originalTitle} />
              : <img src={NoMoviePoster} alt={movie.originalTitle} />
              }
                
              </Link>
              <div className='cardDetails'>
                <div className='cardTitle'>{movie.originalTitle}</div>
              </div>
            </div>
          );
        })}
      </HorizontalScroller>
      <hr />
    </>
  );
}

export default Card;