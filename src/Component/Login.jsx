
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router"
import { auth, db, githubProvider, googleProvider } from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore"

function Login ({setLoggedIn}) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async(event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
      navigate('/'); 
    } catch (error) {
      alert(error.message)
    }
      console.log("Credentials are correct!");
      
    
  };

  //create new user
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    try {
      // 5. Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 6. Create a user document in the 'users' collection in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: user.email, // Use the email from the authenticated user
        mobile: mobile,
      });

      // 7. Log the user in and navigate to home
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert(`Sign Up Failed: ${error.message}`);
    }
  };

  //login with google
  const loginWithGoogle = async() =>{
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user;
      setLoggedIn(true)
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }
  //login with github
  const loginWithGithub = async() =>{
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const user = result.user;
      setLoggedIn(true)
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  
  return (
    
    <>
      <div className='login-container'>
        <div className="log-box-contain">
        <div className={`login-box front ${!isSignUp ? 'active' : 'inactive'}`}>
          <div className='header'>Welcome Back</div>
          <form onSubmit={handleLoginSubmit}>
            <div className='auto-login'>
              <div className='auto-element google' onClick={loginWithGoogle}>
                <div className='google-letter'>G</div>
                <div className='google-letter'>o</div>
                <div className='google-letter'>o</div>
                <div className='google-letter'>g</div>
                <div className='google-letter'>l</div>
                <div className='google-letter'>e</div>
              </div>
              <div className='auto-element github' onClick={loginWithGithub}>Github</div>
              {/* <div className='auto-element linkedin'>
                Linked <div className='linked-id-IN'>In</div>
              </div> */}
            </div>
            <label htmlFor='email'>
              Email: &nbsp;
              <input
                type='email'
                id='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='Enter email...'
                autoComplete='off'
              />
            </label>
            <label htmlFor='password'>
              Password: &nbsp;
              <input
                type='password'
                id='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='enter the password...'
                autoComplete='off'
              />
            </label>
            <button className='login-btn'>Login</button>
          </form>
          <div style={{color:'skyBlue'}}>
            Didn't You create an Account yet?&nbsp;&nbsp;
            <button
              onClick={() => setIsSignUp(true)}
              className='signup-toggle'
            >
              Signup
            </button>
          </div>
        </div>
        
        <div className={`login-box back ${isSignUp ? 'active' : 'inactive'}`}>
          <div className='header'>Create It!</div>
          <form onSubmit={handleSignUpSubmit}>
            <div className='auto-signIn'>
              <div className='auto-element google' onClick={loginWithGoogle}>
                <div className='google-letter'>G</div>
                <div className='google-letter'>o</div>
                <div className='google-letter'>o</div>
                <div className='google-letter'>g</div>
                <div className='google-letter'>l</div>
                <div className='google-letter'>e</div>
              </div>
              <div className='auto-element github' onClick={loginWithGithub}>Github</div>
              {/* <div className='auto-element linkedin'>
                Linked <div className='linked-id-IN'>In</div>
              </div> */}
            </div>
            <label htmlFor='FnameSign'>
              First Name: &nbsp;
              <input
                id='FnameSign'
                type='text'
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder='Enter first name...'
              />
            </label>
            <label htmlFor='LnameSign'>
              New User: &nbsp;
              <input
                id='LnameSign'
                type='text'
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder='Enter last name...'
              />
            </label>
            <label htmlFor='userSign'>
              New User: &nbsp;
              <input 
                id='userSign'
                type='text'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder='Create a user...' />
            </label>
            <label htmlFor='emailSign'>
              Email ID: &nbsp;
              <input
                id='emailSign'
                type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='Enter your email...'
              />
            </label>
            <label htmlFor='passSign'>
              Password: &nbsp;
              <input
                id='passSign'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type='password'
                placeholder='Create a strong password...'
              />
            </label>
            <label htmlFor='mobSign'>
              Mobile No: &nbsp;
              <input
                id='mobSign'
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                type='tel'
                placeholder='Enter your mobile no...'
              />
            </label>
            <button className='create-btn'>Create Account</button>
          </form>
          <div style={{color:'yellowgreen'}} className='toggle-container'>
            Already have an account? &nbsp;&nbsp;
            <button className='login-btn' onClick={() => setIsSignUp(false)}>
              Login
            </button>
          </div>
        </div> 
        </div>
      </div>
    </>
  )
}

export default Login
