import { useState } from 'react'
import { useMovies } from '../MovieContext'

function WishList () {
  const [search, setSearch] = useState('')
  const { watchlist, allMovies, onToggleWatchlist } = useMovies()


  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
 
  const watchlistMovies = allMovies.filter(movie =>
    watchlist.includes(movie.id)
  )

  const displayedMovies = watchlistMovies.filter(movie =>
    movie.originalTitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className='wishlist-Container'>
        <h1>Your Personal WatchList</h1>
        <div className='table-container'>
          {watchlistMovies.length === 0 ? (
            <div className='no-list-container'>
              <h3>No movies have been added to your watchlist yet.</h3>
            </div>
          ) : (
            <>
              <input
                style={{
                  width: '50%',
                  height: '30px',
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  borderRadius: '10px',
                  color: 'whitesmoke'
                }}
                type='search'
                placeholder='search from your playlist...'
                value={search} 
                onChange={handleSearch}
              />
              <div className='table-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th>Movie</th>
                    <th>Release Date</th>
                    <th>Rating</th>
                    <th>Genre</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMovies.map((movie, index) => (
                    <tr key={index}>
                      <td style={{ width: '40%' }}>
                        {movie.primaryImage && movie.primaryTitle ? (
                          <div className='wishlist-movie'>
                            {' '}
                            <img
                              style={{ width: 250 }}
                              src={movie.primaryImage}
                            />{' '}
                            {movie.primaryTitle}{' '}
                          </div>
                        ) : (
                          <h4>-</h4>
                        )}
                      </td>
                      <td style={{ width: '15%' }}>
                        {movie.releaseDate ? (
                          movie.releaseDate
                        ) : (
                          <h4>- / - / ----</h4>
                        )}
                      </td>
                      <td style={{ width: '15%' }}>
                        {movie.averageRating ? movie.averageRating : <h4>-</h4>}
                      </td>
                      <td style={{ width: '15%' }}>
                        {movie.genres
                          ? Object.values(movie.genres).map(
                              (genreName, index) => (
                                <div key={index}>{genreName}</div>
                              )
                            )
                          : '-'}
                      </td>
                      <td style={{ width: '15%' }}>
                        <button
                          className='marked-btn'
                          onClick={() => onToggleWatchlist(movie.id)}
                        >
                          Mark as Done
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default WishList
