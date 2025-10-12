import { Outlet } from "react-router"
import Navbar from "./Navbar"
// import SideBar from "./SideBar"


function Layout({loggedIn}) {
  return (
    <>
      <Navbar loggedIn={loggedIn}/>
      {/* <SideBar/> */}
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default Layout
