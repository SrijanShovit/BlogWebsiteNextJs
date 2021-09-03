import '../styles/globals.css'
import Head from 'next/head'
import {useEffect,useState} from 'react'
import NavBar from './Components/NavBar'
import {auth} from './firebase'
// we want to mount the component only once on network request so we use useEffect
//Re-rendering is done only on changing state
function MyApp({ Component, pageProps }) {
  const [user,setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged(user=>{
        if (user){
          setUser(user)
        }else{
          //logout hone ke baad app ki re-rendering ke liye 
          setUser(null)
        }
    })
  }, [])
  return (
    <>
    <Head>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>

{/* defer allows to read JS only after html parsing */}
   
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    </Head>
    <NavBar user={user}/>
  <Component {...pageProps} user={user}/>
  </>
  )
}


export default MyApp
