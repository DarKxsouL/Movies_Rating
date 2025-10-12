import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFilm, faCog } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router'
const navItems = [
  { icon: faHome, text: 'Home', path: '/' },
  { icon: faFilm, text: 'WishList', path: '/wishlist' },
  { icon: faCog, text: 'Settings', path: '/setting' }
]
function SideBar () {
  return (
    <>
      <div className='sidebar'>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <FontAwesomeIcon icon={item.icon} className='icon' />
                <span className='text'>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default SideBar
