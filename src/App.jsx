import { Route, Routes } from 'react-router'
import './App.css'
import Movies from './Component/Movies'
import Layout from './Component/Layout'
import { MovieProvider } from './Component/MovieContext';

import { lazy, Suspense, useState } from 'react'
const Login = lazy(() => import('./Component/Login'))
const Watchlist = lazy(() => import('./Component/WishList/WishList'))
const MovieDetails = lazy(() => import('./Component/MovieDetails'))
const PageNotFound = lazy(() => import('./Component/PageNotFound'))

function App () {
  const [loggedIn, setLoggedIn] = useState(false)
  console.log("login: ",loggedIn);
  
  return (
    <>
    <MovieProvider>
      <Routes>
        <Route path='/' element={<Layout loggedIn={loggedIn} />}>
          <Route index element={<Movies />} />
          <Route
            path='/watchlist'
            element={
              <Suspense
                fallback={<div>Lets see what you got in your Watchlist...</div>}
              >
                <Watchlist />
              </Suspense>
            }
          />
          <Route
            path='/movie/:id?'
            element={
              <Suspense fallback={<div>Loading movie details...</div>}>
                <MovieDetails />
              </Suspense>
            }
          />
        </Route>
        <Route
          path='/login'
          element={
            <Suspense fallback={<div>Lets get you logged in...</div>}>
              {
                  !loggedIn? <Login setLoggedIn={setLoggedIn}/>: <Movies/>
              }
              
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Check your URL...</div>}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
      {/* <Outlet /> */}
      </MovieProvider>

      {/* <MovieDetails/> */}
    </>
  )
}

export default App
