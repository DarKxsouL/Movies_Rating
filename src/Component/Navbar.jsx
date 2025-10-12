import user from '../assets/user.jpg'
import {  Link, NavLink } from 'react-router'
import { useMovies } from '../Component/MovieContext';

function Navbar({loggedIn}) {
  
  const { searchTerm, setSearchTerm } = useMovies();
  return (
    <>
      <div className='navbar'>
        <div className='navigations'>
        <h1><NavLink to={'/'}>Movies</NavLink></h1>
        <h1><NavLink to={'/watchlist'}>Watchlist</NavLink></h1>
      </div>
      <div>
        <input className='search' type='text' placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      <div className='loginNprofile'>
        {
          !loggedIn?
        <Link to={'/login'}>
        <button className='login'>Login</button>
        </Link>
        :<img src={user} alt="User Profile" />
        }
      </div>
      </div>

    </>
  )
}

export default Navbar
