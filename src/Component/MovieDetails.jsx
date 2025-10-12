import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import youtube from '../assets/youtube.png'
import bucketList from '../assets/bucketList.png'
import rating from '../assets/star.png'
import { useMovies } from '../Component/MovieContext';


function MovieDetails() {
  const {id} = useParams(); 
  const { allMovies, watchlist, onToggleWatchlist } = useMovies(); 
  const [movie, setMovie] = useState();   
  console.log(movie)


  useEffect(() => {
    const foundMovie = allMovies.find(m => m.id === id);
    if (foundMovie) {
      setMovie(foundMovie);
    }
  }, [id, allMovies]);
  

  if (!movie) {
    return (
      <div>
        <h2>Movie Not Found</h2>
        <p>The movie you're looking for was not found in our list.</p>
        <Link to="/">Go back to the movie list</Link>
      </div>
    );
  }



  const isAddedToWatchlist = watchlist.includes(movie.id);

  // Helper to calculate runtime
  const getFormattedRuntime = (runtimeMinutes) => {
    if (!runtimeMinutes) return 'N/A';
    const hours = Math.floor(runtimeMinutes / 60);
    const minutes = runtimeMinutes % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <>
      <div className="movieDetails-container">
        <div className="details-head">
          <div className="details-head-left">
            <h2>{movie.primaryTitle}</h2>
          </div>
          <div className="details-head-right">{/*small details*/}
            
          </div>
        </div>
        <div className="details-center">
            <div className="det-poster-container">
              <img src={movie.primaryImage} alt="" />
            </div>
            <div className="details-content">
              <div className="content-top">
                  <div className="details-title">{movie.primaryTitle}</div>
                  <div className="details-year">{movie.startYear}</div>
                  <div className="details-contentRaring-outer"><div className="details-contentRaring-inner">{movie.contentRating}</div></div>
                  <div className="details-rating"><img width={30} src={rating} alt="" />{movie.averageRating}</div>
              </div>
                <div className="details-runtime">Watch Time : {getFormattedRuntime(movie.runtimeMinutes)}
               
                </div>
                <div className="details-release">Released on : {movie.releaseDate}</div>
              <div className="details-description"><div style={{fontFamily:'Inter', fontWeight:'bold', fontSize:23, color:'#E53935'}}>Overview:</div>{movie.description}</div>

        
              <div className="details-origin-countries">
                {
                  movie.countriesOfOrigin.map((country, index) => (
                    <div key={index} className="details-country">{country}</div>
                  ))
                }
              </div> 
            </div>

            <div className="details-center-side">
              <div className="details-center-side-top"> 
                <img className="lead" src={youtube} />
                <img className="support" src={youtube} />
                <img className="least" src={youtube} />
                <a href={movie.trailer} target="_blank"><div className="youtube">Trailer</div></a>
              </div>
              <div className="details-center-side-bottom">
                <img src={bucketList} />
                <div onClick={(e) => onToggleWatchlist(movie.id, e)} className={`details-watchlist ${isAddedToWatchlist ? 'added' : ''}`}>
                  {isAddedToWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                </div>       
              </div>
            </div>
        </div>

        <div className="det-genre-container">
          {
              movie.genres.map((genre, index) => (
                <div className="detail-genre" key={index}>
                  {genre}
                </div>
              ))
          }
        </div>
      </div>
    </>
  )
}

export default MovieDetails
