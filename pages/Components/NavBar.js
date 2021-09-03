import React from 'react'
import Link from 'next/link'
import {auth} from '../firebase'


export default function NavBar({user}) {
    return (
        <nav>
        <div className="nav-wrapper #03a9f4 light-blue">
          <Link href="/"><a className="brand-logo" align="left">Vlogger</a></Link>
          <ul id="nav-mobile" className="right">
            {user? 
            <>
               <li><Link href="/create_blog">Create Blog</Link></li>
               <button className="btn blue" onClick={() => auth.signOut()}>Logout</button>
            </>
            :
            <>
            <li><Link href="/login"><a>Login</a></Link></li>
            <li><Link href="/signup"><a>Sign Up</a></Link></li>
            </>
            }
           
            
          </ul>
        </div>
      </nav>
    )
}
