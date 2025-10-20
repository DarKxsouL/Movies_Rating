
import { useMovies } from '../Component/MovieContext'
import Cards from './Cards'
import { Link } from 'react-router'
import HorizontalScroller from './HorizontalScroller'

function Movies () {
  const { filteredMovies, searchTerm, refreshMovies } = useMovies()
  const { watchlist, onToggleWatchlist } = useMovies()


  const category = [
    // {
    //   text: 'Top 50 Movies',
    //   url: 'https://imdb236.p.rapidapi.com/api/imdb/top250-movies'
    // },
    {
      text: 'Top Box Office Movies'
      // url: 'https://imdb236.p.rapidapi.com/api/imdb/top-box-office'
    }
    // {
    //   text: 'Most Popular Movies',
    //   url: 'https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies'
    // },
    // {
    //   text: 'Top Rated English Movies',
    //   url: 'https://imdb236.p.rapidapi.com/api/imdb/top-rated-english-movies'
    // },
  ]

  let isAddedToWatchlist = false
  return (
    <div className='movies-page'>
      <h1>Discover Movies</h1>
      {searchTerm ? (
        <>
          {filteredMovies.length > 0 ? (
            <div>
              <h2>Top Box Office Movies</h2>
              <HorizontalScroller>
              {filteredMovies.map(movie => (

                <>
                  {(isAddedToWatchlist = watchlist.includes(movie.id))}
                  
                  <div style={{margineTop:55, borderRadius:'0 10px 10px 10px'}} key={movie.id} className='poster-container'>
                      <div className='playlistBtn'
                        onClick={e => onToggleWatchlist(movie.id, e)}
                      >
                        <div className='bookmark'>
                          {isAddedToWatchlist ? (
                            <div className='check-icon'></div>
                          ) : (
                            <div className='plus-icon'></div>
                          )}
                        </div>
                      </div>
                      <Link to={'/movie/' + movie.id}>
                        <img
                          src={movie.primaryImage}
                          alt={movie.originalTitle}
                        />
                      </Link>
                      <div className='cardDetails'>
                        <div>{movie.originalTitle}</div>
                      </div>

                  </div>
                  
                </>
              ))}
              </HorizontalScroller>
             
              </div>
            
          ) : (
            <p style={{textAlign:'center'}}>No movies found matching your search.</p>
          )}
        </>
      ) : (
        <>
          {category.map((categ, index) => (
            <div key={index}>
              <h2>{categ.text}</h2>
              <Cards onDataFetched={refreshMovies} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Movies
