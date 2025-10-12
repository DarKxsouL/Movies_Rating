import { Link } from 'react-router'

function PageNotFound() {
  return (
    <>
    <div style={{padding:0, margin:0, color:'red', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <h1>404 Page Not Found</h1>
      <Link to={'/'}>Go to Home Page</Link>
      <img src="https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png" alt="" width={450} />
    </div>
    </>
  )
}

export default PageNotFound
